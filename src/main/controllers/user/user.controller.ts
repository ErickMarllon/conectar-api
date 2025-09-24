import {
  DeleteUserUseCase,
  GetSocialUserUseCase,
  GetUserProfileUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  ToggleUserStatusUseCase,
  UpdateSocialUserUseCase,
  UpdateUserUseCase,
} from '@/domain/usecase/pgsql/user';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Express } from 'express';

import { Payload } from '@/domain/contracts/auth/jwt';
import { CreateUserUseCase } from '@/domain/usecase/pgsql/user/create-user-usecase';
import { DeleteUserAddressUseCase } from '@/domain/usecase/pgsql/user/delete-user-address-usecase';
import { UpdateUserAddressUseCase } from '@/domain/usecase/pgsql/user/update-user-address-usecase';
import { ApiAuth } from '@/infrastructure/http/decorators/api-response-type.decorator';
import { CurrentUser } from '@/infrastructure/http/decorators/current-user.decorator';
import { paginateHeaders } from '@/infrastructure/http/decorators/header.decorator';
import { UpdateAddressDto } from '@/infrastructure/http/dtos/address/update-address-data.dto';
import { CreateUserUseCaseModule } from '@/main/factories/usecases/user/modules/create-user-usecase.module';
import { DeleteUserAddressUseCaseModule } from '@/main/factories/usecases/user/modules/delete-user-address-usecase.module';
import { DeleteUserUseCaseModule } from '@/main/factories/usecases/user/modules/delete-user-usecase.module';
import { GetSocialUserUseCaseModule } from '@/main/factories/usecases/user/modules/get-social-user-usecase.module';
import { GetUserProfileUseCaseModule } from '@/main/factories/usecases/user/modules/get-user-profile-usecase.module';
import { GetUserUseCaseModule } from '@/main/factories/usecases/user/modules/get-user-usecase.module';
import { ListUsersUseCaseModule } from '@/main/factories/usecases/user/modules/list-users-usecase.module';
import { ToggleUserStatusUseCaseModule } from '@/main/factories/usecases/user/modules/toggle-user-status-usecase.module';
import { UpdateSessionUserUseCaseModule } from '@/main/factories/usecases/user/modules/update-session-user-usecase.module';
import { UpdateUserAddressUseCaseModule } from '@/main/factories/usecases/user/modules/update-user-Address-usecase.module';
import { UpdateUserUseCaseModule } from '@/main/factories/usecases/user/modules/update-user-usecase.module';
import { Role } from '@/shared/enums';
import { PaginateOptions } from '@/shared/paginate/types';
import {
  CurrentUserDto,
  LoadAllUserInputDto,
  LoadAllUserOutputDto,
  UpdateSocialUserInputDto,
  UpdateUserInputDto,
  UserProfileDto,
} from './dto';
import { CreateUserInputDto } from './dto/create-user-input.dto';
import { LoadUserOutputDto } from './dto/load-user-output.dto';

@ApiTags('user')
@ApiBearerAuth()
@ApiExtraModels()
@Controller('user')
export class UserController {
  constructor(
    @Inject(ListUsersUseCaseModule.LIST_USERS_USECASE)
    private readonly listUsers: ListUsersUseCase,
    @Inject(GetUserUseCaseModule.GET_USER_USECASE)
    private readonly getUser: GetUserUseCase,
    @Inject(GetUserProfileUseCaseModule.GET_USER_PROFILE_USECASE)
    private readonly getUserProfile: GetUserProfileUseCase,
    @Inject(UpdateUserUseCaseModule.UPDATE_USER_USECASE)
    private readonly updateUser: UpdateUserUseCase,
    @Inject(DeleteUserUseCaseModule.DELETE_USER_USECASE)
    private readonly deleteUser: DeleteUserUseCase,
    @Inject(CreateUserUseCaseModule.CREATE_USER_USECASE)
    private readonly createUser: CreateUserUseCase,
    @Inject(ToggleUserStatusUseCaseModule.TOGGLE_USER_STATUS_USECASE)
    private readonly updateUserStatus: ToggleUserStatusUseCase,
    @Inject(UpdateUserAddressUseCaseModule.UPDATE_USER_ADDRES_USECASE)
    private readonly updateUserAddress: UpdateUserAddressUseCase,
    @Inject(DeleteUserAddressUseCaseModule.DELETE_USER_ADDRESS_USECASE)
    private readonly deleteUserAddress: DeleteUserAddressUseCase,
    @Inject(GetSocialUserUseCaseModule.GET_SOCIAL_USER_USECASE)
    private readonly getSocialUser: GetSocialUserUseCase,
    @Inject(UpdateSessionUserUseCaseModule.UPDATE_SOCIAL_USER_USECASE)
    private readonly updateSocialUser: UpdateSocialUserUseCase,
  ) {}

  @Get('/list')
  @ApiAuth({
    type: LoadAllUserOutputDto,
    description: 'Users loaded successfully',
    isPaginated: true,
    statusCode: HttpStatus.OK,
  })
  async list(
    @Query() query: LoadAllUserInputDto,
    @paginateHeaders() meta: PaginateOptions,
    @CurrentUser() currentUser: Payload['sub'],
  ) {
    const { searchTerm, ...filters } = {
      ...query,
      tenant: currentUser.tenant,
    };
    return await this.listUsers({
      filters,
      searchTerm,
      meta,
      currentUser,
    });
  }

  @Post()
  @ApiAuth({
    type: CurrentUserDto,
    description: 'User profile loaded successfully',
    statusCode: HttpStatus.OK,
    fileConfig: { name: 'avatar' },
    roles: [Role.ADMIN, Role.OWNER, Role.DEV],
  })
  async create(
    @Body() body: CreateUserInputDto,
    @CurrentUser() currentUser: CurrentUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.createUser({ ...body, file, tenant: currentUser.tenant });
  }

  @Get('/profile/:id')
  @ApiAuth({
    type: UserProfileDto,
    description: 'User profile loaded successfully',
    statusCode: HttpStatus.OK,
  })
  async profile(
    @CurrentUser() currentUser: CurrentUserDto,
    @Param('id') id: string,
  ) {
    return await this.getUserProfile({
      id,
      tenant: currentUser.tenant,
    });
  }

  @Get('/:id')
  @ApiAuth({
    type: LoadUserOutputDto,
    description: 'User loaded successfully',
    statusCode: HttpStatus.OK,
  })
  async auth(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return await this.getUser({ id, tenant: currentUser.tenant });
  }

  @Patch('/:id')
  @ApiAuth({
    description: 'User updated successfully',
    statusCode: HttpStatus.OK,
    fileConfig: { name: 'avatar' },
  })
  async update(
    @Param('id') user_id: string,
    @Body() data: UpdateUserInputDto,
    @CurrentUser() currentUser: CurrentUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.updateUser({
      user_id,
      data,
      file,
      tenant: currentUser.tenant,
    });
  }

  @Delete()
  @ApiAuth({
    description: 'User deleted successfully',
    statusCode: HttpStatus.NO_CONTENT,
  })
  async delete(@Query('id') id: string, @Query('id[]') ids?: string[]) {
    let normalized: string[] = [];

    if (id) {
      normalized = Array.isArray(id) ? id : [id];
    } else if (ids) {
      normalized = ids;
    }

    return await this.deleteUser(normalized);
  }

  @Patch(':id/status')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
  })
  async blockUser(@Param('id') id: string) {
    await this.updateUserStatus(id);
    return HttpStatus.OK;
  }

  // ADDRESS
  @Patch('/:id/address')
  @ApiAuth({
    type: UpdateAddressDto,
    description: 'User updated successfully',
    statusCode: HttpStatus.OK,
  })
  async updateAddress(
    @Param('id') id: string,
    @Body() address: UpdateAddressDto,
    @CurrentUser() currentUser: Payload['sub'],
  ) {
    return await this.updateUserAddress({
      user_id: id,
      address,
      currentUser,
    });
  }

  @Delete('/:id/address')
  @ApiAuth({
    description: 'User deleted successfully',
    statusCode: HttpStatus.NO_CONTENT,
  })
  async deleteAddress(@Param('id') id: string) {
    return await this.deleteUserAddress(id);
  }

  // SOCIAL
  @Patch('/:id/social')
  @ApiAuth({
    description: 'User updated successfully',
    statusCode: HttpStatus.OK,
  })
  async updateSocial(
    @Param('id') user_id: string,
    @Body() data: UpdateSocialUserInputDto,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return await this.updateSocialUser({
      user_id,
      data,
      tenant: currentUser.tenant,
    });
  }

  @Get('/:id/social')
  @ApiAuth({
    type: LoadUserOutputDto,
    description: 'User loaded successfully',
    statusCode: HttpStatus.OK,
  })
  async social(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return await this.getSocialUser({ id, tenant: currentUser.tenant });
  }
}
