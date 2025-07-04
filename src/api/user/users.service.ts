import { User } from '@/database/entities/user-typeorm.entity';
import { userSearchFields } from '@/shared/constants/user.search.fields';
import { OffsetPaginationDto } from '@/shared/dtos/offset-pagination/offset-pagination.dto';
import { OffsetPaginatedDto } from '@/shared/dtos/offset-pagination/paginated.dto';
import { QueryDto } from '@/shared/dtos/query.dto';
import { UserWithoutPasswordDto } from '@/shared/dtos/user-without-password-dto';
import { UserDto } from '@/shared/dtos/user.dto ';
import { AuthProvider, SortBy } from '@/shared/enums/app.enum';
import { getChangedFields } from '@/shared/utils/getChangedFields';
import { hashPassword, verifyPassword } from '@/shared/utils/password.util';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { UserOutputDto } from './dto/user-output.dto';
import { findOrCreateInputDTO, UserSignInDTO } from './user.dto';
import { applyAdvancedFilter } from './utils/apply-advanced-filter';
import { applySearch } from './utils/apply-search.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOrCreate(
    input: findOrCreateInputDTO,
  ): Promise<UserWithoutPasswordDto> {
    const existingUser = await this.findByEmail(input.email);

    if (existingUser) {
      return existingUser;
    }

    return await this.create(input);
  }

  async findAll(query: QueryUserDto): Promise<OffsetPaginatedDto<User>> {
    const {
      sortBy = SortBy.CREATED_AT,
      searchTerm,
      order,
      offset,
      limit,
      page,
    } = query;

    const filters = plainToInstance(UserFilterDto, query, {
      excludeExtraneousValues: true,
    });

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    applyAdvancedFilter({ queryBuilder, alias: 'user', filters });

    if (searchTerm && searchTerm.trim() !== '') {
      applySearch(queryBuilder, 'user', searchTerm, userSearchFields);
    }

    queryBuilder.orderBy(`user.${sortBy}`, order).skip(offset).take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    const paginationMeta = new OffsetPaginationDto(total, {
      limit,
      page,
      order,
      offset,
    });

    return new OffsetPaginatedDto<User>(items, paginationMeta);
  }

  async validateCredentials(input: UserSignInDTO): Promise<User> {
    const user = await this.findByEmail(input.email, ['session']);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user?.session.source !== AuthProvider.JWT && !user.password) {
      await this.userRepository.update(user.id, {
        password: await hashPassword(input.password),
      });
      return user;
    }

    if (!(await verifyPassword(input.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async getMe(id: string): Promise<UserOutputDto> {
    const user = await this.findByID(id, ['session']);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return {
      ...user,
      access_token: user.session?.access_token,
      refresh_token: user.session?.refresh_token,
    };
  }

  async findInactive(query: QueryDto): Promise<OffsetPaginatedDto<User>> {
    const { limit, offset, page, order, searchTerm } = query;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.where(
      'user.last_login_at < :thirtyDaysAgo OR user.last_login_at IS NULL',
      {
        thirtyDaysAgo,
      },
    );

    if (searchTerm && searchTerm.trim() !== '') {
      applySearch(queryBuilder, 'user', searchTerm, userSearchFields);
    }
    queryBuilder.orderBy(`user.created_at`, order).skip(offset).take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    const paginationMeta = new OffsetPaginationDto(total, {
      limit,
      page,
      order,
      offset,
    });

    return new OffsetPaginatedDto<User>(items, paginationMeta);
  }

  async updateUser(
    id: string,
    input: UpdateUserDto,
  ): Promise<UserWithoutPasswordDto> {
    const user = await this.findByID(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    const password = input.password
      ? await hashPassword(input.password)
      : user.password;

    const updates = getChangedFields(user, input as UserDto);
    await this.userRepository.update(id, {
      ...updates,
      password,
    });

    const updatedUser = await this.findByID(id);

    return plainToInstance(UserWithoutPasswordDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, { last_login_at: new Date() });
  }

  async findByID(id: string, relations: string[] = []) {
    return await this.userRepository.findOne({
      where: { id },
      relations,
    });
  }

  async findByEmail(email: string, relations: string[] = []) {
    return await this.userRepository.findOne({
      where: { email },
      relations,
    });
  }

  async create(
    createUserDto: findOrCreateInputDTO,
  ): Promise<UserWithoutPasswordDto> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }
}
