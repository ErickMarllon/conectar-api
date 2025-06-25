import { Session } from '@/database/entities/session-typeorm.entity';
import { AuthProvider, UserRole } from '@/shared/enums/app.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { plainToInstance } from 'class-transformer';
import ms, { StringValue } from 'ms';
import { JwtConfig } from 'src/infrastructure/config/types/jwt-config.type';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OAuthUserDTO } from '../user/user.dto';
import { UsersService } from '../user/users.service';
import { OAuthDTO } from './dto/auth.dto';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';
import { RefreshReqDto } from './dto/refresh.req.dto';
import { RegisterReqDto } from './dto/register.req.dto';

export type Token = {
  access_token: string;
  refresh_token: string;
  expires: Date;
};

@Injectable()
export class AuthenticationService {
  private readonly tokenSecret: string;
  private readonly tokenExpiresIn: string;
  private readonly refreshSecret: string;
  private readonly refreshExpires: string;

  constructor(
    readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @Inject(CACHE_MANAGER) readonly cacheManager: Cache,
  ) {
    const jwtConfig = configService.getOrThrow<JwtConfig>('jwt');
    this.tokenSecret = jwtConfig.secret;
    this.tokenExpiresIn = jwtConfig.expiresIn;
    this.refreshSecret = jwtConfig.refreshSecret;
    this.refreshExpires = jwtConfig.refreshExpiresIn;
  }

  async validateOAuthUser(authDTO: OAuthDTO, userDTO: OAuthUserDTO) {
    const existingSession = await this.findSession(
      authDTO.source,
      authDTO.source_id,
    );

    if (existingSession && existingSession.user) {
      return await this.updateOAuthUser(existingSession);
    }

    const user = await this.userService.findOrCreate(userDTO);

    const session = await this.createSession(user.id, {
      ...authDTO,
    });

    return plainToInstance(LoginResDto, {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  async signIn(input: LoginReqDto) {
    const user = await this.userService.validateCredentials(input);
    const token = await this.generateAuthTokens(user.id, user.email, user.role);

    let session = await this.findSessionByUserId(user.id);
    if (session) {
      await this.updateSession(session.id, {
        ...token,
        expires: this.parseExpiration(token.expires),
      });
    } else {
      session = await this.createSession(user.id, {
        ...token,
        expires: this.parseExpiration(token.expires),
        source: AuthProvider.JWT,
        source_id: uuidv4(),
      });
    }

    return plainToInstance(LoginResDto, {
      ...user,
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  async signUp(input: RegisterReqDto) {
    const userExist = await this.userService.findByEmail(input.email);
    if (userExist) {
      throw new ConflictException('User already exists with this email');
    }
    const user = await this.userService.create(input);

    const token = await this.generateAuthTokens(user.id, user.email);
    const session = await this.createSession(user.id, {
      ...token,
      expires: this.parseExpiration(token.expires),
      source: AuthProvider.JWT,
      source_id: uuidv4(),
    });

    return plainToInstance(LoginResDto, {
      ...user,
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  async findSessionByUserId(user_id: string) {
    return this.sessionRepository.findOne({
      where: { user_id },
      relations: ['user'],
    });
  }

  async refreshToken(dto: RefreshReqDto): Promise<Token> {
    const { source_id } = await this.verifyToken<Partial<Session>>(
      dto.refreshToken,
      this.refreshSecret,
    );
    if (!source_id) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const session = await this.validateSession(source_id);

    await this.sessionRepository.update(session.id, session);
    return this.generateAuthTokens(
      session.user_id,
      session.user.email,
      session.user.role,
    );
  }

  private async updateOAuthUser(existingSession: Session) {
    const tokens = await this.generateAuthTokens(
      existingSession.user.id,
      existingSession.user.email,
      existingSession.user.role,
    );

    await this.updateSession(existingSession.id, {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires: this.parseExpiration(tokens.expires),
    });
    return existingSession.user;
  }

  private parseExpiration(exp?: unknown): Date {
    if (exp instanceof Date) return exp;
    if (typeof exp === 'number') return new Date(exp);
    if (typeof exp === 'string') return new Date(exp);

    return new Date(Date.now() + ms(this.refreshExpires as StringValue));
  }

  private async generateAuthTokens(
    id: string,
    email: string,
    role?: UserRole,
  ): Promise<Token> {
    const tokenExpires = this.parseExpiration();
    const userRole = role ?? UserRole.USER;

    const [access_token, refresh_token] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: id,
          role: userRole,
          email: email,
        },
        {
          secret: this.tokenSecret,
          expiresIn: this.tokenExpiresIn,
          algorithm: 'HS256',
        },
      ),

      await this.jwtService.signAsync(
        {
          id: id,
          role: userRole,
          email: email,
        },
        {
          secret: this.refreshSecret,
          expiresIn: this.refreshExpires,
          algorithm: 'HS256',
        },
      ),
    ]);
    return {
      access_token,
      refresh_token,
      expires: tokenExpires,
    };
  }

  private findSession(source: string, source_id: string) {
    return this.sessionRepository.findOne({
      where: { source_id },
      relations: ['user'],
    });
  }

  private updateSession(id: string, data: Partial<Session>) {
    return this.sessionRepository.update(id, data);
  }

  private createSession(user_id: string, authDTO: OAuthDTO) {
    const session = this.sessionRepository.create({
      ...authDTO,
      user_id,
    });
    return this.sessionRepository.save(session);
  }

  private async verifyToken<T extends object>(
    token: string,
    secret: string,
  ): Promise<T> {
    try {
      return await this.jwtService.verify<T>(token, { secret });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async validateSession(sessionId: string): Promise<Session> {
    const session = await this.sessionRepository.findOneBy({
      id: sessionId,
    });
    if (!session || session.id !== sessionId)
      throw new UnauthorizedException('Invalid session');
    return session;
  }
}
