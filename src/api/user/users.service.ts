import { User } from '@/database/entities/user-typeorm.entity';
import { OffsetPaginationDto } from '@/shared/dtos/offset-pagination/offset-pagination.dto';
import { OffsetPaginatedDto } from '@/shared/dtos/offset-pagination/paginated.dto';
import { AuthProvider, Order, SortBy } from '@/shared/enums/app.enum';
import { hashPassword, verifyPassword } from '@/shared/utils/password.util';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOutputDto } from './dto/user-output.dto';
import { findOrCreateInputDTO, UserSignInDTO } from './user.dto';
import { applySearch } from './utils/apply-search.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOrCreate(input: findOrCreateInputDTO): Promise<User> {
    const existingUser = await this.findByEmail(input.email);

    if (existingUser) {
      return existingUser;
    }

    return await this.create(input);
  }

  async create(createUserDto: findOrCreateInputDTO): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(query: QueryUserDto): Promise<OffsetPaginatedDto<User>> {
    const {
      page,
      limit,
      role,
      sortBy = SortBy.CREATED_AT,
      order = Order.ASC,
      offset,
      search,
    } = query;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const searchableFields: (keyof User)[] = [
      'email',
      'first_name',
      'last_name',
    ];

    if (search && search.trim() !== '') {
      applySearch(queryBuilder, 'user', search, searchableFields);
    }
    if (role) {
      queryBuilder.where('user.role = :role', { role });
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

  async getMe(id: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['session'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return {
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      picture: user.picture,
      role: user?.role,
      access_token: user.session?.access_token || '',
      refresh_token: user.session?.refresh_token || null,
    };
  }
  async findByID(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['session'],
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findInactive(): Promise<User[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.userRepository.find({
      where: [
        { last_login_at: LessThan(thirtyDaysAgo) },
        { last_login_at: undefined },
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findBySearchTerm(
    query: QueryUserDto,
  ): Promise<OffsetPaginatedDto<User>> {
    const {
      page,
      limit,
      role,
      sortBy = SortBy.CREATED_AT,
      order = Order.ASC,
      offset,
      search,
    } = query;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const searchableFields: (keyof User)[] = [
      'email',
      'first_name',
      'last_name',
    ];

    if (search && search.trim() !== '') {
      applySearch(queryBuilder, 'user', search, searchableFields);
    }
    if (role) {
      queryBuilder.where('user.role = :role', { role });
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    await this.userRepository.update(id, {
      password: updateUserDto.password
        ? await hashPassword(updateUserDto.password)
        : user.password,
      ...updateUserDto,
    });
    const updatedUser = await this.findByID(id);

    if (!updatedUser) {
      throw new NotFoundException(
        `User with ID "${id}" not found after update`,
      );
    }

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.update(id, {
      deleted_at: new Date(),
    });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, { last_login_at: new Date() });
  }

  async validateCredentials(input: UserSignInDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: input.email },
      relations: ['session'],
    });
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
}
