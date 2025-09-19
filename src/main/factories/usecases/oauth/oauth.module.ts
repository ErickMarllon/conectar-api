import { Module } from '@nestjs/common';
import {
  ExchageCodeFactoryModule,
  OAuthRedirectFactoryModule,
  SigninOAuthFactoryModule,
} from './modules';

@Module({
  imports: [
    SigninOAuthFactoryModule.register(),
    OAuthRedirectFactoryModule.register(),
    ExchageCodeFactoryModule.register(),
  ],
  exports: [
    SigninOAuthFactoryModule,
    OAuthRedirectFactoryModule,
    ExchageCodeFactoryModule,
  ],
})
export class OAuthModule {}
