import { JwtConfig } from '@/infrastructure/config/types/jwt-config.type';
import { AuthProvider } from '@/shared/enums/app.enum';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../authentication.service';
import { IJwtPayload } from '../dto/Ijwt-payload.dto';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  AuthProvider.JWT_REFRESH,
) {
  constructor(
    private authService: AuthenticationService,
    configService: ConfigService,
  ) {
    const jwtConfig = configService.get<JwtConfig>('jwt');
    if (!jwtConfig) {
      throw new Error('JWT secret not configured');
    }
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.refreshSecret,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.authService.validateAccessToken(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
