import { Module } from '@nestjs/common';
import {
  CreateUserUseCaseModule,
  DeleteUserAddressUseCaseModule,
  DeleteUserUseCaseModule,
  GetSocialUserUseCaseModule,
  GetUserProfileUseCaseModule,
  GetUserUseCaseModule,
  ListUsersUseCaseModule,
  ToggleUserStatusUseCaseModule,
  UpdateSessionUserUseCaseModule,
  UpdateUserAddressUseCaseModule,
  UpdateUserUseCaseModule,
} from './modules';

@Module({
  imports: [
    DeleteUserUseCaseModule.register(),
    GetUserUseCaseModule.register(),
    GetUserProfileUseCaseModule.register(),
    UpdateUserUseCaseModule.register(),
    CreateUserUseCaseModule.register(),
    ToggleUserStatusUseCaseModule.register(),
    ListUsersUseCaseModule.register(),
    UpdateUserAddressUseCaseModule.register(),
    DeleteUserAddressUseCaseModule.register(),
    UpdateSessionUserUseCaseModule.register(),
    GetSocialUserUseCaseModule.register(),
  ],
  exports: [
    ListUsersUseCaseModule,
    DeleteUserUseCaseModule,
    GetUserUseCaseModule,
    GetUserProfileUseCaseModule,
    UpdateUserUseCaseModule,
    ToggleUserStatusUseCaseModule,
    CreateUserUseCaseModule,
    UpdateUserAddressUseCaseModule,
    DeleteUserAddressUseCaseModule,
    UpdateSessionUserUseCaseModule,
    GetSocialUserUseCaseModule,
  ],
})
export class UserUseCasesModule {}
