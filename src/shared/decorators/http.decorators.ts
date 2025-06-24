import { JwtAuthGuard } from '@/api/authentication/guard/jwt.guard';
import { RolesGuard } from '@/api/authentication/guard/roles.guard';
import {
  HttpCode,
  HttpStatus,
  type Type,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import { ErrorDto } from '../dtos/error.dto';
import { ApiAuthType, UserRole } from '../enums/app.enum';
import { Public } from './public.decorator';
import { Roles } from './roles.decorator';
import { ApiPaginatedResponse } from './swagger.decorators';

type ApiResponseType = number;

interface IApiOptions<T extends Type<any>> {
  type?: T | T[];
  summary?: string;
  description?: string;
  errorResponses?: ApiResponseType[];
  statusCode?: HttpStatus;
  isPaginated?: boolean;
}

type IApiPublicOptions = IApiOptions<Type<any>>;
interface IApiAuthOptions extends IApiOptions<Type<any>> {
  auths?: ApiAuthType[];
  roles?: UserRole[];
}

const defaultStatusCode = HttpStatus.OK;
const defaultErrorResponses = [
  HttpStatus.BAD_REQUEST,
  HttpStatus.FORBIDDEN,
  HttpStatus.NOT_FOUND,
  HttpStatus.UNPROCESSABLE_ENTITY,
  HttpStatus.INTERNAL_SERVER_ERROR,
];

const createErrorResponses = (
  errorResponses: ApiResponseType[] = defaultErrorResponses,
) => {
  return errorResponses.map((statusCode) =>
    ApiResponse({
      status: statusCode,
      type: ErrorDto,
      description: STATUS_CODES[statusCode],
    }),
  );
};

const createSuccessResponse = (options: IApiOptions<Type<any>>) => {
  const isArray = Array.isArray(options.type)[0];
  const responseConfig = {
    type: isArray ? isArray : options.type || Object,
    description: options?.description ?? 'OK',
  };

  if (options.isPaginated) {
    return ApiPaginatedResponse(responseConfig);
  }

  return options.statusCode === HttpStatus.CREATED
    ? ApiCreatedResponse(responseConfig)
    : ApiOkResponse(responseConfig);
};

const createAuthDecorators = (
  auths: ApiAuthType[] = [ApiAuthType.JWT],
  roles: UserRole[] = [UserRole.USER],
) => {
  return auths.map((auth) => {
    switch (auth) {
      case ApiAuthType.BASIC:
        return applyDecorators(
          ApiBasicAuth(),
          Roles(...roles),
          UseGuards(JwtAuthGuard, RolesGuard),
        );
      case ApiAuthType['API-KEY']:
        return applyDecorators(
          ApiSecurity('Api-Key'),
          Roles(...roles),
          UseGuards(JwtAuthGuard, RolesGuard),
        );
      case ApiAuthType.JWT:
      default:
        return applyDecorators(
          ApiBearerAuth(),
          Roles(...roles),
          UseGuards(JwtAuthGuard, RolesGuard),
        );
    }
  });
};
export const ApiPublic = (options: IApiPublicOptions = {}): MethodDecorator => {
  return applyDecorators(
    Public(),
    ApiOperation({ summary: options?.summary }),
    HttpCode(options.statusCode || defaultStatusCode),
    createSuccessResponse(options),
    ...createErrorResponses(options.errorResponses),
  );
};

export const ApiAuth = (options: IApiAuthOptions = {}): MethodDecorator => {
  return applyDecorators(
    ApiOperation({ summary: options?.summary }),
    HttpCode(options.statusCode || defaultStatusCode),
    createSuccessResponse(options),
    ...createAuthDecorators(options.auths, options.roles),
    ...createErrorResponses(options.errorResponses),
  );
};
