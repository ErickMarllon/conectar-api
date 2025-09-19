import {
  Payload,
  PayloadGenerateRes,
  PayloadInput,
} from '@/domain/contracts/auth/jwt';
import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { JwtConfig } from '@/infrastructure/config/types/jwt-config.type';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms, { StringValue } from 'ms';

@Injectable()
export class JwtTokenService implements IJwtService {
  private readonly tokenSecret: string;
  private readonly tokenExpiresIn: string;
  private readonly refreshSecret: string;
  private readonly refreshExpires: string;
  constructor(
    private readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {
    const jswtdata = configService.getOrThrow<JwtConfig>('jwt');
    this.tokenSecret = jswtdata.secret;
    this.tokenExpiresIn = jswtdata.expiresIn;
    this.refreshSecret = jswtdata.refreshSecret;
    this.refreshExpires = jswtdata.refreshExpiresIn;
  }

  async checkToken({
    access_token,
    refresh_token,
  }: PayloadInput): Promise<Payload> {
    const token = access_token ? access_token : refresh_token;
    const secret = access_token ? this.tokenSecret : this.refreshSecret;

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      return await this.jwtService.verifyAsync(token, { secret });
    } catch (_err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async generateTokens(payload: Payload): Promise<PayloadGenerateRes> {
    const requiredFields: Pick<Payload, 'sub'> = payload;

    for (const key in requiredFields.sub) {
      if (!requiredFields.sub[key as keyof typeof requiredFields.sub]) {
        throw new UnauthorizedException(
          `Invalid token payload: missing "${key}"`,
        );
      }
    }

    try {
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: this.tokenSecret,
          expiresIn: this.tokenExpiresIn,
          algorithm: 'HS256',
        }),
        this.jwtService.signAsync(payload, {
          secret: this.refreshSecret,
          expiresIn: this.refreshExpires,
          algorithm: 'HS256',
        }),
      ]);

      return {
        access_token,
        refresh_token,
        access_token_expires: ms(this.tokenExpiresIn as StringValue),
        refresh_token_expires: ms(this.refreshExpires as StringValue),
      };
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to generate JWT tokens: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }
}
