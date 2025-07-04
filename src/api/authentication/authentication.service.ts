import { Session } from '@/database/entities/session-typeorm.entity';
import { AccessTypes, AuthProvider, UserRole } from '@/shared/enums/app.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
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
import { UserOutputDto } from '../user/dto/user-output.dto';
import { UserWithoutPasswordDto } from '../user/dto/user-without-password-dto';
import { UsersService } from '../user/users.service';
import { IJwtPayload } from './dto/Ijwt-payload.dto';
import { LoginReqDto } from './dto/login.req.dto';
import { OAuthUserDTO } from './dto/oauth-user.dto';
import { OAuthDTO } from './dto/oauth.dto';
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

  async signIn(input: LoginReqDto): Promise<UserOutputDto> {
    const user = await this.userService.validateCredentials(input);
    const tokens = await this.generateAuthTokens(
      user.id,
      user.email,
      user.role,
    );

    const session = await this.sessionRepository.findOne({
      where: { user_id: user.id },
    });
    const sessionData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      source: AuthProvider.JWT,
      expires: this.parseExpiration(tokens.expires),
    };

    if (session) {
      await this.sessionRepository.update(session.id, sessionData);
    } else {
      await this.createSession(user.id, {
        ...sessionData,
        source_id: uuidv4(),
      });
    }

    await this.userService.updateLastLogin(user.id);

    return plainToInstance(
      UserOutputDto,
      {
        ...user,
        ...tokens,
      },
      { excludeExtraneousValues: true },
    );
  }

  async signUp(input: RegisterReqDto) {
    const existingUser = await this.userService.findOneBy({
      email: input.email,
    });
    if (existingUser)
      throw new ConflictException('User already exists with this email');

    const user = await this.userService.create(input);
    const tokens = await this.generateAuthTokens(
      user.id,
      user.email,
      user.role,
    );

    await this.createSession(user.id, {
      ...tokens,
      expires: this.parseExpiration(tokens.expires),
      source: AuthProvider.JWT,
      source_id: uuidv4(),
    });

    await this.userService.updateLastLogin(user.id);

    return plainToInstance(UserOutputDto, {
      ...user,
      ...tokens,
    });
  }

  async validateOAuthUser(authDTO: OAuthDTO, userDTO: OAuthUserDTO) {
    const existingSession = await this.findSession(authDTO.source_id);

    if (existingSession?.user && authDTO?.source) {
      existingSession.source = authDTO.source as string;
      const { user } = existingSession;
      const userUpdate = {
        id: user.id,
        ...userDTO,
      };
      const sessionUpdated = await this.updateOAuthUser(
        existingSession,
        userUpdate,
      );

      if (!sessionUpdated) {
        throw new NotFoundException('Session could not be updated');
      }
      await this.userService.updateLastLogin(sessionUpdated?.user_id as string);

      return plainToInstance(UserOutputDto, {
        ...sessionUpdated.user,
        access_token: sessionUpdated.access_token,
        refresh_token: sessionUpdated.refresh_token,
      });
    }
    const user = await this.userService.findOrCreate(userDTO);
    const { access_token, refresh_token } = await this.createSession(
      user.id,
      authDTO,
    );
    await this.userService.updateLastLogin(user.id);

    return plainToInstance(UserOutputDto, {
      ...user,
      access_token,
      refresh_token,
    });
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const payload = await this.jwtService.verifyAsync<IJwtPayload>(
      refreshToken,
      { secret: this.refreshSecret },
    );

    const requiredFields = ['id', 'email', 'role', 'type'];
    const missingField = requiredFields.find((field) => !payload?.sub?.[field]);

    if (missingField) {
      throw new UnauthorizedException(
        `Invalid token payload: missing "${missingField}" in validateAccessToken`,
      );
    }

    if (payload?.sub?.type !== AccessTypes.REFRESH) {
      throw new UnauthorizedException('Invalid token type');
    }

    const session = await this.findSessionByUserId(payload.sub.id);

    const tokens = await this.generateAuthTokens(
      session.user.id,
      session.user.email,
      session.user.role,
    );

    await this.sessionRepository.update(session.id, {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires: tokens.expires,
    });

    return tokens;
  }

  public async findSessionByUserId(user_id: string) {
    const session = await this.sessionRepository.findOne({
      where: { user_id },
      relations: ['user'],
    });
    if (!session || !session.user)
      throw new NotFoundException('Session not found');
    return session;
  }

  async logout(user_id: string): Promise<void> {
    const session = await this.findSessionByUserId(user_id);
    if (!session) throw new NotFoundException('Session not found');
    await this.sessionRepository.delete(session.id);
  }

  private async updateOAuthUser(
    session: Session,
    user: Partial<UserWithoutPasswordDto>,
  ) {
    const tokens = await this.generateAuthTokens(
      session.user.id,
      session.user.email,
      session.user.role,
    );

    await this.sessionRepository.update(session.id, {
      ...tokens,
      source: session.source,
      source_id: session.source_id,
      expires: this.parseExpiration(tokens.expires),
    });

    if (user && user.id) {
      await this.userService.updateUser(user.id, user);
    }

    return await this.findSession(session.source_id);
  }

  async validateAccessToken(payload: IJwtPayload): Promise<UserOutputDto> {
    const requiredFields = ['id', 'email', 'role', 'type'];
    const missing = requiredFields.find((f) => !payload?.sub?.[f]);
    if (missing) throw new UnauthorizedException(`Missing field: ${missing}`);

    if (payload.sub.type !== AccessTypes[payload.sub.type.toUpperCase()]) {
      throw new UnauthorizedException('Invalid token type');
    }

    const session = await this.findSessionByUserId(payload.sub.id);

    return plainToInstance(UserOutputDto, {
      ...session.user,
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  async validateToken(token: string, secret: string, type: AccessTypes) {
    if (type !== AccessTypes.REFRESH) {
      throw new UnauthorizedException('Invalid token type');
    }

    const payload = await this.jwtService.verifyAsync<IJwtPayload>(token, {
      secret,
    });
    const requiredFields = ['id', 'email', 'role', 'type'];
    const missing = requiredFields.find((f) => !payload?.sub?.[f]);
    if (missing) throw new UnauthorizedException(`Missing field: ${missing}`);

    const session = await this.findSessionByUserId(payload.sub.id);

    return plainToInstance(UserOutputDto, {
      ...session.user,
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  private parseExpiration(exp?: unknown): Date {
    if (exp instanceof Date) return exp;
    if (typeof exp === 'number') return new Date(exp);
    if (typeof exp === 'string') return new Date(exp);
    return new Date(Date.now() + ms(this.refreshExpires as StringValue));
  }

  async generateAuthTokens(
    id: string,
    email: string,
    role = UserRole.USER,
  ): Promise<Token> {
    const expires = this.parseExpiration();
    const payload = { id, email, role };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { sub: { ...payload, type: AccessTypes.ACCESS } },
        {
          secret: this.tokenSecret,
          expiresIn: this.tokenExpiresIn,
          algorithm: 'HS256',
        },
      ),
      this.jwtService.signAsync(
        { sub: { ...payload, type: AccessTypes.REFRESH } },
        {
          secret: this.refreshSecret,
          expiresIn: this.refreshExpires,
          algorithm: 'HS256',
        },
      ),
    ]);

    return { access_token, refresh_token, expires };
  }

  private findSession(source_id: string): Promise<Session | null> {
    return this.sessionRepository.findOne({
      where: { source_id },
      relations: ['user'],
    });
  }

  private createSession(id: string, authDTO: OAuthDTO) {
    const session = this.sessionRepository.create({
      ...authDTO,
      user_id: id,
    });
    return this.sessionRepository.save(session);
  }
}
