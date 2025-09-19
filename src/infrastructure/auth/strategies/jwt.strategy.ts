import { Payload } from '@/domain/contracts/auth/jwt';
import { JwtConfig } from '@/infrastructure/config/types/jwt-config.type';
import { SessionSource } from '@/shared/enums';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, SessionSource.JWT) {
  constructor(configService: ConfigService) {
    const jwtConfig = configService.getOrThrow<JwtConfig>('jwt');
    if (!jwtConfig) {
      throw new Error('JWT secret not configured');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate({ sub }: Payload) {
    if (!sub) {
      throw new UnauthorizedException('Invalid token');
    }

    for (const key in sub) {
      if (Object.prototype.hasOwnProperty.call(sub, key)) {
        const value = sub[key as keyof typeof sub];
        if (value === undefined || value === null || value === '') {
          throw new UnauthorizedException('Invalid token');
        }
      }
    }

    return sub;
  }
}
