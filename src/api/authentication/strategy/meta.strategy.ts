// src/modules/auth/strategies/meta.strategy.ts
import { OAuthUserDTO } from '@/api/user/user.dto';
import { MetaConfig } from '@/infrastructure/config/types/meta-config.type';
import { metaScope, profileFieldsMeta } from '@/shared/constants/app.constant';
import { AuthProvider } from '@/shared/enums/app.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Profile, Strategy } from 'passport-facebook';
import { AuthenticationService } from '../authentication.service';
import { OAuthDTO } from '../dto/auth.dto';

@Injectable()
export class MetaStrategy extends PassportStrategy(
  Strategy,
  AuthProvider.META,
) {
  constructor(
    configService: ConfigService,
    private authenticationService: AuthenticationService,
  ) {
    const metaConfig = configService.getOrThrow<MetaConfig>('meta');

    super({
      clientID: metaConfig.clientID,
      clientSecret: metaConfig.clientSecret,
      callbackURL: metaConfig.callbackURL,
      profileFields: profileFieldsMeta,
      scope: metaScope,
      graphAPIVersion: 'v18.0',
    });
  }

  async validate(
    access_token: string,
    refresh_token: string,
    profile: Profile,
  ) {
    const { id, name, emails, photos } = profile;
    const photoUrl = await this.getHighResPhoto(access_token, profile.id);

    const authDto = new OAuthDTO();
    authDto.source_id = id;
    authDto.source = AuthProvider.META;
    authDto.access_token = access_token;
    authDto.refresh_token = refresh_token;
    authDto.expires = null;

    const userDto = new OAuthUserDTO();
    userDto.email = emails?.[0]?.value || '';
    userDto.first_name = name?.givenName || '';
    userDto.last_name = name?.familyName || '';
    userDto.picture = photoUrl || photos?.[0]?.value || '';

    return await this.authenticationService.validateOAuthUser(authDto, userDto);
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
      return response.data?.data?.url || '';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return '';
    }
  }
}
