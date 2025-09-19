import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import {
  CreateListTenantUseCase,
  CreateTenantUseCase,
} from '@/domain/usecase/pgsql/tenant';
import { ApiPaginateHeaders } from '@/infrastructure/http/decorators/api-header-paginate.decorator';
import { ApiPublic } from '@/infrastructure/http/decorators/api-response-type.decorator';
import { paginateHeaders } from '@/infrastructure/http/decorators/header.decorator';
import { CreateListTenantUseCaseModule } from '@/main/factories/usecases/tenant/modules/create-list-tenant-usecase.module';
import { CreateTenantUseCaseModule } from '@/main/factories/usecases/tenant/modules/create-tenant-usecase.module';
import { PaginateOptions } from '@/shared/paginate/types';
import { LoadAllTenantInputDto, LoadAllTenantOutputDto } from './dto';
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
    //-------
    // @Inject(GetUserUseCaseModule.GET_USER_USECASE)
    // private readonly getUser: GetUserUseCase,
    // @Inject(GetUserProfileUseCaseModule.GET_USER_PROFILE_USECASE)
    // private readonly getUserProfile: GetUserProfileUseCase,
    // @Inject(UpdateUserUseCaseModule.UPDATE_USER_USECASE)
    // private readonly updateUser: UpdateUserUseCase,
    // @Inject(DeleteUserUseCaseModule.DELETE_USER_USECASE)
    // private readonly deleteUser: DeleteUserUseCase,
    // @Inject(ToggleUserStatusUseCaseModule.TOGGLE_USER_STATUS_USECASE)
    // private readonly updateUserStatus: ToggleUserStatusUseCase,
    // @Inject(UpdateUserAddressUseCaseModule.UPDATE_USER_ADDRES_USECASE)
    // private readonly updateUserAddress: UpdateUserAddressUseCase,
    // @Inject(DeleteUserAddressUseCaseModule.DELETE_USER_ADDRESS_USECASE)
    // private readonly deleteUserAddress: DeleteUserAddressUseCase,
  ) {}

  @Get('/list')
  @ApiPublic({
    type: LoadAllTenantOutputDto,
    description: 'Users loaded successfully',
    isPaginated: true,
    statusCode: HttpStatus.OK,
  })
  @ApiPaginateHeaders()
  async list(
    @Query() query: LoadAllTenantInputDto,
    @paginateHeaders() meta: PaginateOptions,
  ) {
    const { searchTerm, ...filters } = query;
    return await this.listTenant({
      filters,
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

  // @Get('/profile')
  // @ApiAuth({
  //   type: UserProfileDto,
  //   description: 'User profile loaded successfully',
  //   statusCode: HttpStatus.OK,
  // })
  // async profile(@CurrentUser() currentUser: CurrentUserDto) {
  //   return await this.getUserProfile({
  //     id: currentUser.id,
  //     tenant: currentUser.tenant,
  //   });
  // }

  // @Get('/:id')
  // @ApiAuth({
  //   type: LoadUserOutputDto,
  //   description: 'User loaded successfully',
  //   statusCode: HttpStatus.OK,
  // })
  // async auth(
  //   @Param('id') id: string,
  //   @CurrentUser() currentUser: CurrentUserDto,
  // ) {
  //   return await this.getUser({ id, tenant: currentUser.tenant });
  // }

  // @ApiBody({
  //   type: UpdateUserInputDto,
  // })
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(
  //   FileInterceptor('avatar', { storage: multer.memoryStorage() }),
  // )
  // @Patch('/:id')
  // @ApiAuth({
  //   type: UserUpdateOutputDto,
  //   description: 'User updated successfully',
  //   statusCode: HttpStatus.OK,
  // })
  // async update(
  //   @Param('id') id: string,
  //   @Body() body: UpdateUserInputDto,
  //   @CurrentUser() currentUser: CurrentUserDto,
  //   @UploadedFile() file?: Express.Multer.File,
  // ) {
  //   return await this.updateUser({
  //     user_id: id,
  //     data: body,
  //     file,
  //     tenant: currentUser.tenant,
  //   });
  // }

  // @Delete()
  // @ApiAuth({
  //   description: 'User deleted successfully',
  //   statusCode: HttpStatus.NO_CONTENT,
  // })
  // async delete(@Query('id') id: string, @Query('id[]') ids?: string[]) {
  //   let normalized: string[] = [];

  //   if (id) {
  //     normalized = Array.isArray(id) ? id : [id];
  //   } else if (ids) {
  //     normalized = ids;
  //   }

  //   return await this.deleteUser(normalized);
  // }

  // @Patch(':id/status')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'User updated successfully',
  // })
  // async blockUser(@Param('id') id: string) {
  //   await this.updateUserStatus(id);
  //   return HttpStatus.OK;
  // }
  // // --------------------------
  // @ApiBody({
  //   type: UpdateAddressDto,
  // })
  // @Patch('/:id/address')
  // @ApiAuth({
  //   type: UpdateAddressDto,
  //   description: 'User updated successfully',
  //   statusCode: HttpStatus.OK,
  // })
  // async updateAddress(@Param('id') id: string, @Body() body: UpdateAddressDto) {
  //   return await this.updateUserAddress({
  //     user_id: id,
  //     address: body,
  //   });
  // }

  // @Delete('/:id/address')
  // @ApiAuth({
  //   description: 'User deleted successfully',
  //   statusCode: HttpStatus.NO_CONTENT,
  // })
  // async deleteAddress(@Param('id') id: string) {
  //   return await this.deleteUserAddress(id);
  // }
}
