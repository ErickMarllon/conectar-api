import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '@/database/entities/user-typeorm.entity';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ApiAuth } from '@/shared/decorators/http.decorators';
import { Roles } from '@/shared/decorators/roles.decorator';
import { UserRole } from '@/shared/enums/app.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiAuth({
    summary: 'Create a new user (Admin only)',
    description:
      'This endpoint allows an admin to create a new user. The password will be hashed before saving.',
    type: User,
    roles: [UserRole.ADMIN],
    statusCode: HttpStatus.CREATED,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiAuth({
    summary: 'Get all users (Admin only)',
    description:
      'This endpoint allows an admin to retrieve all users. It supports pagination and filtering.',
    type: [User],
    roles: [UserRole.ADMIN],
    isPaginated: true,
    statusCode: HttpStatus.CREATED,
  })
  findAll(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query);
  }

  @Get('/search')
  @ApiAuth({
    summary: 'Get all users (Admin only)',
    description:
      'This endpoint allows an admin to retrieve all users. It supports pagination and filtering.',
    type: [User],
    roles: [UserRole.USER],
    isPaginated: true,
    statusCode: HttpStatus.CREATED,
  })
  search(@Query() query: QueryUserDto) {
    return this.usersService.findBySearchTerm(query);
  }

  @Get('inactive')
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get inactive users (no login in last 30 days) (Admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return inactive users',
    type: [User],
  })
  findInactive() {
    return this.usersService.findInactive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return the user', type: User })
  findOne(@Param('id') id: string, @CurrentUser() currentUser: User) {
    if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException('You can only access your own user data');
    }
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException('You can only update your own user data');
    }

    if (currentUser.role !== UserRole.ADMIN && updateUserDto.role) {
      delete updateUserDto.role;
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete user by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
