import {
  ExchangeCodeOauthUseCase,
  ProcessOauthUseCase,
} from '@/domain/usecase/pgsql/user/auth';
import { CurrentUser, Public } from '@/infrastructure/http/decorators';
import {
  CaptureRedirectGuard,
  CsrfStateGenerateGuard,
  CsrfStateGuard,
  GoogleAuthGuard,
  MetaAuthGuard,
} from '@/infrastructure/http/guards';
import {
  ExchageCodeFactoryModule,
  OAuthRedirectFactoryModule,
} from '@/main/factories/usecases/oauth';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Redirect,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUserDto } from '../user/dto';
import { AuthOutputDto } from './dto';

@ApiTags('auth')
@ApiExtraModels()
@Controller('auth')
export class OAuthController {
  constructor(
    @Inject(OAuthRedirectFactoryModule.PROCESS_OAUTH_REDIRECT_USECASE)
    private readonly processOauthRedirectUseCase: ProcessOauthUseCase,
    @Inject(ExchageCodeFactoryModule.EXCHANGE_CODE_OAUTH_USECASE)
    private readonly exchangeCodeForSessionUseCase: ExchangeCodeOauthUseCase,
  ) {}

  @Get('google')
  @Public()
  @ApiOperation({ summary: 'Google OAuth sign-in' })
  @ApiResponse({
    status: HttpStatus.PERMANENT_REDIRECT,
    description: 'Redirecting to Google OAuth',
  })
  @UseGuards(CaptureRedirectGuard, CsrfStateGenerateGuard, GoogleAuthGuard)
  async signInWithGoogle() {}

  @Get('google/callback')
  @Public()
  @Redirect()
  @ApiResponse({
    status: HttpStatus.MOVED_PERMANENTLY,
    description: 'Redirected after Google login',
  })
  @UseGuards(GoogleAuthGuard, CsrfStateGuard)
  async googleAuthCallback(
    @Session() session: { redirectUrl: string },
    @CurrentUser() user: CurrentUserDto,
  ) {
    if (!user) {
      return {
        url: `${session?.redirectUrl}auth/notfound`,
        statusCode: HttpStatus.MOVED_PERMANENTLY,
      };
    }

    const url = await this.processOauthRedirectUseCase({
      user,
      redirectUrl: session.redirectUrl,
    });
    return { url, statusCode: HttpStatus.MOVED_PERMANENTLY };
  }

  @Get('meta')
  @Public()
  @ApiOperation({ summary: 'Meta OAuth sign-in' })
  @ApiResponse({
    status: HttpStatus.PERMANENT_REDIRECT,
    description: 'Redirecting to Meta OAuth',
  })
  @UseGuards(CaptureRedirectGuard, CsrfStateGenerateGuard, MetaAuthGuard)
  async signInWithMeta() {}

  @Get('meta/callback')
  @Public()
  @Redirect()
  @ApiResponse({
    status: HttpStatus.MOVED_PERMANENTLY,
    description: 'Redirected after Meta login',
  })
  @UseGuards(MetaAuthGuard, CsrfStateGuard)
  async metaAuthCallback(
    @Session() session: { redirectUrl: string },
    @CurrentUser() user: CurrentUserDto,
  ) {
    if (!user) {
      return {
        url: `${session?.redirectUrl}auth/notfound`,
        statusCode: HttpStatus.MOVED_PERMANENTLY,
      };
    }

    const url = await this.processOauthRedirectUseCase({
      user,
      redirectUrl: session.redirectUrl,
    });
    return { url, statusCode: HttpStatus.MOVED_PERMANENTLY };
  }
  @Get('token/:code')
  @Public()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User authenticated successfully',
    type: AuthOutputDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async getUserByToken(@Param('code') code: string) {
    return await this.exchangeCodeForSessionUseCase(code);
  }
}
