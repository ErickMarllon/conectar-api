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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ApiAuth } from '@/shared/decorators/http.decorators';
import { QueryDto } from '@/shared/dtos/query.dto';
import { UserRole } from '@/shared/enums/app.enum';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOutputDto } from './dto/user-output.dto';
import { UserWithoutPasswordDto } from './dto/user-without-password-dto';
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
    type: UserOutputDto,
    roles: [UserRole.ADMIN],
    statusCode: HttpStatus.CREATED,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get('profile')
  @ApiAuth({
    summary: 'Sign in with email and password',
    description:
      'Sign in using email and password to get user profile and tokens',
    statusCode: HttpStatus.OK,
    type: UserOutputDto,
  })
  async getMe(
    @CurrentUser() currentUser: UserOutputDto,
  ): Promise<UserOutputDto> {
    return plainToInstance(UserOutputDto, currentUser, {
      excludeExtraneousValues: true,
    });
  }
  @Get()
  @ApiAuth({
    summary: 'Get all users (Admin only)',
    description: 'Retrieves all users with pagination and filtering.',
    type: [UserOutputDto],
    roles: [UserRole.ADMIN],
    isPaginated: true,
    statusCode: HttpStatus.OK,
  })
  findAll(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query);
  }

  @Get('/search')
  @ApiAuth({
    summary: 'Search users (Admin only)',
    description: 'Allows admin to search users.',
    type: [UserOutputDto],
    roles: [UserRole.ADMIN],
    isPaginated: true,
    statusCode: HttpStatus.OK,
  })
  search(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query);
  }

  @Get('inactive')
  @ApiAuth({
    summary: 'Get inactive users (Admin only)',
    description: 'Retrieves users inactive for 30+ days.',
    type: [UserOutputDto],
    roles: [UserRole.ADMIN],
    // isPaginated: true,
    statusCode: HttpStatus.OK,
  })
  findInactive(@Query() query: QueryDto) {
    return this.usersService.findInactive(query);
  }

  @Get(':id')
  @ApiAuth({
    summary: 'Get user by ID',
    description: 'Retrieve a user by ID.',
    type: UserOutputDto,
    roles: [UserRole.ADMIN],
    statusCode: HttpStatus.OK,
  })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() currentUser: UserOutputDto,
  ) {
    if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException('You can only access your own user data');
    }
    const user = await this.usersService.findOneBy({ id });
    return plainToInstance(UserWithoutPasswordDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @ApiAuth({
    summary: 'Update user by ID',
    description: 'Update user data.',
    type: UserOutputDto,
    roles: [UserRole.ADMIN, UserRole.USER],
    statusCode: HttpStatus.OK,
  })
  update(
    @Param('id') id: string,
    @Body() input: UpdateUserDto,
    @CurrentUser() currentUser: UserOutputDto,
  ) {
    if (currentUser.role !== UserRole.ADMIN || currentUser.id !== id) {
      throw new ForbiddenException('You can only update your own user data');
    }

    if (currentUser.role !== UserRole.ADMIN && input.role) {
      delete input.role;
    }

    return this.usersService.updateUser(id, input);
  }

  @Delete(':id')
  @ApiAuth({
    summary: 'Delete user by ID (Admin only)',
    description: 'Deletes a user by ID.',
    roles: [UserRole.ADMIN],
    statusCode: HttpStatus.OK,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
