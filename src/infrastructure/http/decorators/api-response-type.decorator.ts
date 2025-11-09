import { ErrorDto } from '@/shared/dto/error.dto';
import {
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  applyDecorators,
  type Type,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import multer from 'multer';
import { RolesGuard } from '../guards';
import { ApiPaginateHeaders } from './api-header-paginate.decorator';
import { Public } from './public-routes.decorator';
import { Roles } from './role.decorator';
import { ApiPaginatedResponse } from './swagger.decorators';

type ApiResponseType = HttpStatus;
type ApiAuthType = 'basic' | 'api-key' | 'jwt' | 'role';
type paginateType = 'offset' | 'cursor';
type FileField = { name: string; maxCount?: number };

interface IApiOptions<T extends Type<any>> {
  type?: T | any;
  summary?: string;
  description?: string;
  errorResponses?: ApiResponseType[];
  statusCode?: HttpStatus;
  isPaginated?: boolean;
  paginateType?: paginateType;
  fileName?: string;
  fileConfig?: FileField | FileField[];
}

interface IApiAuthOptions<T extends Type<any>> extends IApiOptions<T> {
  auths?: ApiAuthType[];
  roles?: string[];
}

const defaultPublicErrors: ApiResponseType[] = [
  HttpStatus.BAD_REQUEST,
  HttpStatus.FORBIDDEN,
  HttpStatus.NOT_FOUND,
  HttpStatus.UNPROCESSABLE_ENTITY,
  HttpStatus.INTERNAL_SERVER_ERROR,
];

const defaultAuthErrors: ApiResponseType[] = [
  HttpStatus.BAD_REQUEST,
  HttpStatus.UNAUTHORIZED,
  HttpStatus.FORBIDDEN,
  HttpStatus.NOT_FOUND,
  HttpStatus.UNPROCESSABLE_ENTITY,
  HttpStatus.INTERNAL_SERVER_ERROR,
];

function buildOkResponse<T extends Type<any>>(options: IApiOptions<T>) {
  if (options.statusCode === HttpStatus.NO_CONTENT) {
    return ApiResponse({
      status: HttpStatus.NO_CONTENT,
      description: 'No Content',
    });
  }
  const ok = {
    type: options.type,
    description: options?.description ?? 'OK',
    paginateType: options.paginateType || 'offset',
  };

  if (options.isPaginated) {
    return ApiPaginatedResponse(ok);
  }

  if (options.statusCode === HttpStatus.CREATED) {
    return ApiCreatedResponse(ok);
  }

  return ApiOkResponse(ok);
}

function buildErrorResponses(statusCodes: ApiResponseType[] = []) {
  return statusCodes.map((status) =>
    ApiResponse({
      status,
      type: ErrorDto,
      description: STATUS_CODES[status],
    }),
  );
}

function buildAuthDecorators(
  auths: ApiAuthType[] = [],
  roles: string[] = [],
): MethodDecorator[] {
  if (roles.length > 0) {
    auths.push('role');
  }
  const decorators: MethodDecorator[] = [];

  auths.map((auth) => {
    switch (auth) {
      case 'basic':
        decorators.push(ApiBasicAuth());
        break;
      case 'api-key':
        decorators.push(ApiSecurity('Api-Key'));
        break;
      case 'jwt':
        decorators.push(ApiBearerAuth());
        break;
      case 'role':
        decorators.push(Roles(...roles));
        decorators.push(UseGuards(RolesGuard));
        break;
      default:
        decorators.push(ApiBearerAuth());
    }
  });
  return decorators;
}

function buildHeaders<T extends Type<any>>(
  options: IApiOptions<T>,
): MethodDecorator[] {
  const decorators: MethodDecorator[] = [];

  if (options.isPaginated) {
    decorators.push(ApiPaginateHeaders());
  }

  return decorators;
}

function buildFile(fileConfig?: FileField | FileField[]): MethodDecorator[] {
  const decorators: MethodDecorator[] = [];
  if (!fileConfig) return decorators;

  decorators.push(ApiConsumes('multipart/form-data'));

  if (Array.isArray(fileConfig)) {
    decorators.push(
      UseInterceptors(
        FileFieldsInterceptor(fileConfig, {
          storage: multer.memoryStorage(),
        }),
      ),
    );
  } else {
    decorators.push(
      UseInterceptors(
        FileInterceptor(fileConfig.name, {
          storage: multer.memoryStorage(),
        }),
      ),
    );
  }
  return decorators;
}

export const ApiPublic = <T extends Type<any>>(
  options: IApiOptions<T> = {} as IApiOptions<T>,
): MethodDecorator => {
  const statusCode = options.statusCode ?? HttpStatus.OK;

  return applyDecorators(
    Public(),
    ApiOperation({ summary: options.summary }),
    HttpCode(statusCode),
    buildOkResponse(options),
    ...buildHeaders(options),
    ...buildFile(options.fileConfig),
    ...buildErrorResponses(options.errorResponses ?? defaultPublicErrors),
  );
};

export const ApiAuth = <T extends Type<any>>(
  options: IApiAuthOptions<T> = {} as IApiOptions<T>,
): MethodDecorator => {
  const statusCode = options.statusCode ?? HttpStatus.OK;

  return applyDecorators(
    ApiOperation({ summary: options.summary }),
    HttpCode(statusCode),
    buildOkResponse(options),
    ...buildHeaders(options),
    ...buildFile(options.fileConfig),
    ...buildAuthDecorators(options.auths ?? ['jwt'], options.roles ?? []),
    ...buildErrorResponses(options.errorResponses ?? defaultAuthErrors),
  );
};
