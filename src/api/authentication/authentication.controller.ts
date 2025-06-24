import { User } from '@/database/entities/user-typeorm.entity';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ApiAuth, ApiPublic } from '@/shared/decorators/http.decorators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Redirect,
  Session,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { UserAccessTokenDto } from '../user/dto/user-output-token.dto';
import { UserOutputDto } from '../user/dto/user-output.dto';
import { UserPayload } from '../user/user.dto';
import { AuthenticationService, Token } from './authentication.service';
import { LoginReqDto } from './dto/login.req.dto';
import { RefreshReqDto } from './dto/refresh.req.dto';
import { RegisterReqDto } from './dto/register.req.dto';
import { CaptureRedirectGuard } from './guard/capture-redirect.guard';
import { CsrfStateGenerateGuard } from './guard/csrf-state-generate.guard';
import { CsrfStateGuard } from './guard/csrf-state.guard';
import { GoogleAuthGuard } from './guard/google.auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  private readonly frontendUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly authenticationService: AuthenticationService,

    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.frontendUrl = process.env.FRONTEND_URL ?? '';
  }

  @Get('token/:code')
  @ApiPublic({
    summary: 'Get access token using code',
    description:
      'This endpoint retrieves an access token using a code generated during the OAuth flow. The code is valid for 24 hours.',
    statusCode: HttpStatus.OK,
    type: UserAccessTokenDto,
  })
  async getToken(@Param('code') code: string): Promise<Partial<UserOutputDto>> {
    const access_token = await this.cacheManager.get<string>(code);

    if (!access_token) {
      throw new NotFoundException('Invalid code');
    }
    const decoded = this.jwtService.decode(access_token) as UserPayload;
    const session = await this.authenticationService.findSessionByUserId(
      decoded.id,
    );
    await this.cacheManager.del(code);

    return {
      user_id: session?.user_id,
      first_name: session?.user?.first_name,
      last_name: session?.user?.last_name,
      email: session?.user?.email,
      picture: session?.user?.picture,
      access_token: session?.access_token,
      refresh_token: session?.refresh_token,
    };
  }

  @Get('google')
  @ApiPublic({
    summary: 'Google OAuth sign-in',
    description:
      'This endpoint initiates the Google OAuth flow. It redirects the user to Google for authentication.',
    statusCode: HttpStatus.PERMANENT_REDIRECT,
  })
  @UseGuards(CaptureRedirectGuard, CsrfStateGenerateGuard, GoogleAuthGuard)
  signInWithGoogle() {}

  @Get('google/callback')
  @ApiPublic({
    summary: 'Google OAuth callback',
    description:
      'This endpoint is called after Google OAuth flow is completed. It exchanges the Google user information for a session token.',
    statusCode: HttpStatus.PERMANENT_REDIRECT,
  })
  @UseGuards(GoogleAuthGuard, CsrfStateGuard)
  @Redirect()
  async googleAuthCallback(
    @Session() session: { redirectUrl?: string },
    @CurrentUser() user: User,
  ) {
    const code = uuidv4();
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    const redirectUrl = session?.redirectUrl || '/';

    await this.cacheManager.set(code, token, 60 * 60 * 24);

    return {
      url: `${this.frontendUrl}/auth/callback?code=${code}&redirect_url=${redirectUrl}`,
      statusCode: HttpStatus.MOVED_PERMANENTLY,
    };
  }

  @Get('me')
  @ApiAuth({
    summary: 'Sign in with email and password',
    description:
      'Sign in using email and password to get user profile and tokens',
    statusCode: HttpStatus.OK,
    type: UserOutputDto,
  })
  async getMe(@CurrentUser() user: UserOutputDto): Promise<UserOutputDto> {
    return {
      user_id: user?.user_id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      picture: user?.picture,
      access_token: user?.access_token,
      refresh_token: user?.refresh_token,
    };
  }

  @Post('signin')
  @ApiPublic({
    summary: 'Sign in with email and password',
    description:
      'Sign in using email and password to get user profile and tokens',
    statusCode: HttpStatus.OK,
    type: UserOutputDto,
  })
  async signIn(@Body() input: LoginReqDto): Promise<UserOutputDto> {
    return await this.authenticationService.signIn(input);
  }

  @Post('signup')
  @ApiPublic({
    summary: 'Sign up with email, password, and name',
    description: 'sign up using email, password, and name to create a new user',
    statusCode: HttpStatus.OK,
    type: UserOutputDto,
  })
  async signUp(@Body() input: RegisterReqDto): Promise<UserOutputDto> {
    return await this.authenticationService.signUp(input);
  }

  @ApiPublic()
  @Post('refresh')
  async refresh(@Body() dto: RefreshReqDto): Promise<Token> {
    return await this.authenticationService.refreshToken(dto);
  }
}
