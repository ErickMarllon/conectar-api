import { Module } from '@nestjs/common';
import {
  RefreshTokenFactoryModule,
  SigninFactoryModule,
  SignoutFactoryModule,
  SignupFactoryModule,
} from './modules';
import { UpdateUserPasswordUseCaseModule } from './modules/update-user-password-usecase.module';

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
