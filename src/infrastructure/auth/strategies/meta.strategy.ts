import { OAuthSession, OAuthUser } from '@/domain/contracts/pgsql/repositories';
import { OauthUseCaseFactory } from '@/domain/usecase/pgsql/user/auth';
import { SessionSource } from '@/shared/enums';

import { MetaConfig } from '@/infrastructure/config/types/meta-config.type';
import { SigninOAuthFactoryModule } from '@/main/factories/usecases/oauth';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Request } from 'express';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class MetaStrategy extends PassportStrategy(
  Strategy,
  SessionSource.META,
) {
  constructor(
    configService: ConfigService,
    @Inject(SigninOAuthFactoryModule.SIGNIN_OAUTH_USECASE)
    private readonly oauthGoogleUseCase: ReturnType<OauthUseCaseFactory>,
  ) {
    const metaConfig = configService.getOrThrow<MetaConfig>('meta');

    super({
      clientID: metaConfig.clientID,
      clientSecret: metaConfig.clientSecret,
      callbackURL: metaConfig.callbackURL,
      profileFields: ['id', 'emails', 'name', 'displayName', 'photos'],
      scope: ['email'],
      graphAPIVersion: 'v18.0',
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    access_token: string,
    refresh_token: string,
    profile: Profile,
    expires_token?: string,
  ) {
    const { id: source_id, name, emails, photos } = profile;
    const photoUrl = await this.getHighResPhoto(access_token, profile.id);

    const sessionOptions: OAuthSession = {
      source_id,
      source: SessionSource.META,
      access_token,
      refresh_token,
      expires_token,
    };

    const userOptions: OAuthUser = {
      email: emails?.[0]?.value,
      first_name: name?.givenName,
      last_name: name?.familyName,
      avatar_url: photoUrl || photos?.[0]?.value,
    };
    const tenant = req.session.tenant;
    return await this.oauthGoogleUseCase({
      sessionOptions,
      userOptions,
      tenant,
    });
  }

  private async getHighResPhoto(
    access_token: string,
    userId: string,
  ): Promise<string> {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v18.0/${userId}/picture`,
        {
          params: {
            redirect: false,
            height: 512,
            width: 512,
            access_token,
          },
        },
      );
      return response.data?.data?.url;
    } catch (_) {
      return '';
    }
  }
}
