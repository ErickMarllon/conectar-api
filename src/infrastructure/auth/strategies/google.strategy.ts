import { OAuthSession, OAuthUser } from '@/domain/contracts/pgsql/repositories';
import { OauthUseCaseFactory } from '@/domain/usecase/pgsql/user/auth';
import { SessionSource } from '@/shared/enums';

import { GoogleConfig } from '@/infrastructure/config/types/google-config.type';
import { SigninOAuthFactoryModule } from '@/main/factories/usecases/oauth';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  SessionSource.GOOGLE,
) {
  constructor(
    @Inject(SigninOAuthFactoryModule.SIGNIN_OAUTH_USECASE)
    private readonly oauthGoogleUseCase: ReturnType<OauthUseCaseFactory>,
    configService: ConfigService,
  ) {
    const googleConfig = configService.getOrThrow<GoogleConfig>('google');
    super({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: [
        'openid',
        'profile',
        'email',
        // 'https://www.googleapis.com/auth/calendar',
        // 'https://www.googleapis.com/auth/drive',
      ],
      passReqToCallback: true,
    });
  }

  authorizationParams(req: any): any {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }

  async validate(
    req: Request,
    access_token: string,
    refresh_token: string,
    profile: Profile,
    expires_token?: string,
  ) {
    const {
      sub: source_id,
      given_name: first_name,
      family_name: last_name,
      email,
      picture,
    } = profile._json;

    const sessionOptions: OAuthSession = {
      source_id,
      source: SessionSource.GOOGLE,
      access_token,
      refresh_token,
      expires_token,
    };

    const userOptions: OAuthUser = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      avatar_url: this.getHighResGooglePhoto(picture),
    };
    const tenant = req.session.tenant;

    return await this.oauthGoogleUseCase({
      sessionOptions,
      userOptions,
      tenant,
    });
  }
  private getHighResGooglePhoto(pictureUrl?: string): string {
    if (!pictureUrl) return '';
    return pictureUrl.replace(/=s\d+-c$/, '=s512-c');
  }
}
