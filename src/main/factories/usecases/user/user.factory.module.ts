import { Module } from '@nestjs/common';
import { CreateUserUseCaseModule } from './modules/create-user-usecase.module';
import { DeleteUserAddressUseCaseModule } from './modules/delete-user-address-usecase.module';
import { DeleteUserUseCaseModule } from './modules/delete-user-usecase.module';
import { GetSocialUserUseCaseModule } from './modules/get-social-user-usecase.module';
import { GetUserProfileUseCaseModule } from './modules/get-user-profile-usecase.module';
import { GetUserUseCaseModule } from './modules/get-user-usecase.module';
import { ListUsersUseCaseModule } from './modules/list-users-usecase.module';
import { ToggleUserStatusUseCaseModule } from './modules/toggle-user-status-usecase.module';
import { UpdateSessionUserUseCaseModule } from './modules/update-session-user-usecase.module';
import { UpdateUserAddressUseCaseModule } from './modules/update-user-Address-usecase.module';
import { UpdateUserUseCaseModule } from './modules/update-user-usecase.module';

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
