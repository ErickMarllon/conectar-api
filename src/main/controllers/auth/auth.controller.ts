import {
  RefreshTokenUseCase,
  SigninUseCase,
  SignOutUseCase,
  SignupUseCase,
} from '@/domain/usecase/pgsql/user/auth';
// import { ApiResponseType } from '@/infrastructure/http/decorators/api-response-type.decorator';
import { UpdateUserPasswordUseCase } from '@/domain/usecase/pgsql/user/auth/update-user-password-usecase';
import {
  ApiAuth,
  ApiPublic,
} from '@/infrastructure/http/decorators/api-response-type.decorator';
import { CurrentUser } from '@/infrastructure/http/decorators/current-user.decorator';
import {
  RefreshTokenFactoryModule,
  SigninFactoryModule,
  SignoutFactoryModule,
  SignupFactoryModule,
} from '@/main/factories/usecases/auth';
import { UpdateUserPasswordUseCaseModule } from '@/main/factories/usecases/auth/modules/update-user-password-usecase.module';
import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CurrentUserDto } from '../user/dto';
import { AuthOutputDto, RefreshTokenOutputDto, RegisterInputDto } from './dto';
import { SigninInputDto } from './dto/login-input.dto';
import { UpdateUserPasswordInputDto } from './dto/update-user-password-input.dto';

@ApiTags('auth')
@ApiExtraModels()
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SignupFactoryModule.SIGNUP_USECASE)
    private readonly signupUseCase: SignupUseCase,
    @Inject(SigninFactoryModule.SIGNIN_USECASE)
    private readonly signinUseCase: SigninUseCase,
    @Inject(SignoutFactoryModule.SIGNOUT_USECASE)
    private readonly signOutUseCase: SignOutUseCase,
    @Inject(UpdateUserPasswordUseCaseModule.UPDATE_USER_PASSWORD_USECASE)
    private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase,
    @Inject(RefreshTokenFactoryModule.REFRESH_TOKEN_USECASE)
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  @ApiPublic({
    type: AuthOutputDto,
    description: 'Login realizado com sucesso',
    statusCode: HttpStatus.OK,
    summary: 'User login',
  })
  async signin(@Body() body: SigninInputDto, @Req() req: Request) {
    const ip_address =
      (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    const user_agent = req.headers['user-agent'];

    return await this.signinUseCase({ ...body, ip_address, user_agent });
  }

  @Post('register')
  @ApiPublic({
    type: AuthOutputDto,
    description: 'Register realizado com sucesso',
    statusCode: HttpStatus.OK,
    summary: 'User Register',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: AuthOutputDto,
  })
  async signup(@Body() body: RegisterInputDto) {
    return await this.signupUseCase(body);
  }

  @Post('refresh')
  @ApiHeader({
    name: 'x-refresh-token',
    description: 'Refresh token for generating new access token',
    required: true,
  })
  @ApiPublic({
    type: RefreshTokenOutputDto,
    description: 'Token successfully renewed',
    statusCode: HttpStatus.OK,
  })
  async refresh(@Headers('x-refresh-token') refresh_token: string) {
    return await this.refreshTokenUseCase({ refresh_token });
  }

  @Patch('logout')
  @ApiAuth({
    description: 'Logout (Invalidated Current Session)',
    isPaginated: true,
    statusCode: HttpStatus.NO_CONTENT,
  })
  async signOut(@CurrentUser() user: CurrentUserDto): Promise<void> {
    await this.signOutUseCase(user);
  }

  @Patch('change-password/:id')
  @ApiAuth({
    type: AuthOutputDto,
    description: 'Usuário atualizado com sucesso',
    statusCode: HttpStatus.OK,
  })
  async updateUserPassword(
    @CurrentUser() currentUser: CurrentUserDto,
    @Param('id') user_id: string,
    @Body() body: UpdateUserPasswordInputDto,
  ): Promise<void> {
    await this.updateUserPasswordUseCase({
      currentUser,
      user_id,
      ...body,
    });
  }
}
