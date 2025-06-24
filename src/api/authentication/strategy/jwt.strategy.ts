import { UserPayload } from '@/api/user/user.dto';
import { AuthProvider } from '@/shared/enums/app.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from 'src/infrastructure/config/types/jwt-config.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthProvider.JWT) {
  constructor(configService: ConfigService) {
    const jwtConfig = configService.get<JwtConfig>('jwt');
    if (!jwtConfig) {
      throw new Error('JWT secret not configured');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: UserPayload) {
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
