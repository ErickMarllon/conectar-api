import { googleScope } from '@/shared/constants/app.constant';
import { AuthProvider } from '@/shared/enums/app.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { GoogleConfig } from 'src/infrastructure/config/types/google-config.type';
import { AuthenticationService } from '../authentication.service';
import { OAuthUserDTO } from '../dto/oauth-user.dto';
import { OAuthDTO } from '../dto/oauth.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  AuthProvider.GOOGLE,
) {
  constructor(
    private authenticationService: AuthenticationService,
    configService: ConfigService,
  ) {
    const googleConfig = configService.getOrThrow<GoogleConfig>('google');
    super({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: googleScope,
    });
  }

  async validate(
    access_token: string,
    refresh_token: string,
    profile: Profile,
  ) {
    const {
      sub: id,
      given_name: first_name,
      family_name: last_name,
      email,
      picture,
    } = profile._json;

    const authDto = new OAuthDTO();
    authDto.source_id = id;
    authDto.source = AuthProvider.GOOGLE;
    authDto.access_token = access_token;
    authDto.refresh_token = refresh_token;
    authDto.expires = null;

    const userDto = new OAuthUserDTO();
    userDto.email = email || '';
    userDto.first_name = first_name || '';
    userDto.last_name = last_name || '';
    userDto.picture = this.getHighResGooglePhoto(picture);

    return await this.authenticationService.validateOAuthUser(authDto, userDto);
  }
  private getHighResGooglePhoto(pictureUrl?: string): string {
    if (!pictureUrl) return '';
    return pictureUrl.replace(/=s\d+-c$/, '=s512-c');
  }
}
