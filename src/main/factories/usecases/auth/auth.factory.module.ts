import { Module } from '@nestjs/common';
import {
  RefreshTokenFactoryModule,
  SigninFactoryModule,
  SignoutFactoryModule,
  SignupFactoryModule,
  UpdateUserPasswordUseCaseModule,
} from './modules';

@Module({
  imports: [
    SignupFactoryModule.register(),
    SigninFactoryModule.register(),
    RefreshTokenFactoryModule.register(),
    SignoutFactoryModule.register(),
    UpdateUserPasswordUseCaseModule.register(),
  ],
  exports: [
    SignupFactoryModule,
    SigninFactoryModule,
    RefreshTokenFactoryModule,
    SignoutFactoryModule,
    UpdateUserPasswordUseCaseModule,
  ],
})
export class AuthFactoryModule {}
