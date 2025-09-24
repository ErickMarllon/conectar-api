import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { Payload } from '@/domain/contracts/auth/jwt';
import {
  CreateGetTenantUseCase,
  CreateListTenantUseCase,
  CreatePatchTenantUseCase,
  CreateTenantUseCase,
  PathTenantAddressUseCase,
} from '@/domain/usecase/pgsql/tenant';
import {
  ApiAuth,
  ApiPublic,
} from '@/infrastructure/http/decorators/api-response-type.decorator';
import { CurrentUser } from '@/infrastructure/http/decorators/current-user.decorator';
import { paginateHeaders } from '@/infrastructure/http/decorators/header.decorator';
import { UpdateAddressDto } from '@/infrastructure/http/dtos/address/update-address-data.dto';
import { CreateGetTenantUseCaseModule } from '@/main/factories/usecases/tenant/modules/create-get-tenant-usecase.module';
import { CreateListTenantUseCaseModule } from '@/main/factories/usecases/tenant/modules/create-list-tenant-usecase.module';
import { CreatePatchTenantAddressUseCaseModule } from '@/main/factories/usecases/tenant/modules/create-patch-Address-usecase.module';
import { CreatePatchTenantUseCaseModule } from '@/main/factories/usecases/tenant/modules/create-patch-tenant-usecase.module';
import { CreateTenantUseCaseModule } from '@/main/factories/usecases/tenant/modules/create-tenant-usecase.module';
import { Role } from '@/shared/enums';
import { PaginateOptions } from '@/shared/paginate/types';
import { CurrentUserDto } from '../user/dto';
import {
  LoadAllTenantInputDto,
  LoadTenantOutputDto,
  PathTenantInputDto,
} from './dto';
import { CreateTenantInputDto } from './dto/create-tenant-input.dto';
import { CreateTenantOutputDto } from './dto/create-tenant-output.dto';

@ApiTags('tenant')
@ApiBearerAuth()
@ApiExtraModels()
@Controller('tenant')
export class TenantController {
  constructor(
    @Inject(CreateTenantUseCaseModule.CREATE_TENANT_USECASE)
    private readonly createTenant: CreateTenantUseCase,
    @Inject(CreateListTenantUseCaseModule.LIST_TENANT_USECASE)
    private readonly listTenant: CreateListTenantUseCase,
    @Inject(CreateGetTenantUseCaseModule.GET_TENANT_USECASE)
    private readonly getTenant: CreateGetTenantUseCase,
    @Inject(CreatePatchTenantUseCaseModule.PATCH_TENANT_USECASE)
    private readonly pathUser: CreatePatchTenantUseCase,
    @Inject(CreatePatchTenantAddressUseCaseModule.PATCH_TENANT_ADDRES_USECASE)
    private readonly pathTenantAddress: PathTenantAddressUseCase,

    //-------
    // @Inject(GetUserProfileUseCaseModule.GET_USER_PROFILE_USECASE)
    // private readonly getUserProfile: GetUserProfileUseCase,
    // @Inject(UpdateUserUseCaseModule.UPDATE_USER_USECASE)
    // private readonly updateUser: UpdateUserUseCase,
    // @Inject(DeleteUserUseCaseModule.DELETE_USER_USECASE)
    // private readonly deleteUser: DeleteUserUseCase,
    // @Inject(ToggleUserStatusUseCaseModule.TOGGLE_USER_STATUS_USECASE)
    // private readonly updateUserAddress: UpdateUserAddressUseCase,
    // @Inject(DeleteUserAddressUseCaseModule.DELETE_USER_ADDRESS_USECASE)
    // private readonly deleteUserAddress: DeleteUserAddressUseCase,
  ) {}

  @Get('/list')
  @ApiAuth({
    type: LoadTenantOutputDto,
    description: 'Tenant loaded successfully',
    isPaginated: true,
    statusCode: HttpStatus.OK,
  })
  async list(
    @Query() query: LoadAllTenantInputDto,
    @paginateHeaders() meta: PaginateOptions,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    const { searchTerm, ...filters } = query;
    return await this.listTenant({
      filters: {
        ...filters,
        is_public: !(
          currentUser.role === Role.OWNER || currentUser.role === Role.DEV
        ),
      },
      searchTerm,
      meta,
    });
  }

  @ApiPublic({
    type: CreateTenantOutputDto,
    description: 'User profile loaded successfully',
    statusCode: HttpStatus.OK,
  })
  @Post()
  async create(@Body() body: CreateTenantInputDto) {
    return await this.createTenant({ ...body });
  }

  @Get()
  @ApiAuth({
    type: LoadTenantOutputDto,
    description: 'User loaded successfully',
    statusCode: HttpStatus.OK,
    roles: [Role.ADMIN, Role.OWNER, Role.STAFF, Role.DEV],
  })
  async get(@CurrentUser() currentUser: CurrentUserDto) {
    return await this.getTenant({ name: currentUser.tenant });
  }

  @Get('/:id')
  @ApiAuth({
    type: LoadTenantOutputDto,
    description: 'User loaded successfully',
    statusCode: HttpStatus.OK,
    roles: [Role.ADMIN, Role.OWNER, Role.STAFF, Role.DEV],
  })
  async getById(@Param('id') id: string) {
    return await this.getTenant({ id });
  }

  @Patch('/:id')
  @ApiAuth({
    description: 'Tenant updated successfully',
    statusCode: HttpStatus.OK,
    fileConfig: [
      { name: 'logo', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ],
  })
  async update(
    @Param('id') id: string,
    @Body() data: PathTenantInputDto,
    @UploadedFiles()
    rawFiles: {
      logo?: Express.Multer.File[];
      cover?: Express.Multer.File[];
    },
  ) {
    const logo = rawFiles.logo?.[0];
    const cover = rawFiles.cover?.[0];

    return await this.pathUser({
      id,
      data,
      logo,
      cover,
    });
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
    return await this.pathTenantAddress({
      tenant_id: id,
      address,
      currentUser,
    });
  }

  // @Delete('/:id/address')
  // @ApiAuth({
  //   description: 'User deleted successfully',
  //   statusCode: HttpStatus.NO_CONTENT,
  // })
  // async deleteAddress(@Param('id') id: string) {
  //   return await this.deleteUserAddress(id);
  // }

  // SOCIAL
  // @Patch('/:id/social')
  // @ApiAuth({
  //   description: 'User updated successfully',
  //   statusCode: HttpStatus.OK,
  // })
  // async updateSocial(
  //   @Param('id') user_id: string,
  //   @Body() data: UpdateSocialUserInputDto,
  //   @CurrentUser() currentUser: CurrentUserDto,
  // ) {
  //   return await this.updateSocialUser({
  //     user_id,
  //     data,
  //     tenant: currentUser.tenant,
  //   });
  // }

  // @Get('/:id/social')
  // @ApiAuth({
  //   type: LoadUserOutputDto,
  //   description: 'User loaded successfully',
  //   statusCode: HttpStatus.OK,
  // })
  // async social(
  //   @Param('id') id: string,
  //   @CurrentUser() currentUser: CurrentUserDto,
  // ) {
  //   return await this.getSocialUser({ id, tenant: currentUser.tenant });
  // }
}
