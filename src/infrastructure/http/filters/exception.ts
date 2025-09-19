import { QueryError } from '@/domain/errors';
import { LoggerService } from '@/infrastructure/gateways/logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import * as fs from 'fs';
import { QueryFailedError } from 'typeorm';
interface IError {
  message: string;
  code_error: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const parsed = this.parseError(exception);

    const responseData = {
      statusCode: status,
      message: parsed.message,
      code_error: parsed.code_error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logMessage(request, parsed, status, exception);
    response.status(status).json(responseData);
  }

  private parseError(exception: any): IError {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      if (typeof res === 'object' && res !== null) {
        const responseObj = res as any;

        const message = Array.isArray(responseObj.message)
          ? responseObj.message.join(', ')
          : responseObj.message || 'Erro inesperado';

        const code_error =
          responseObj.code_error ||
          responseObj.error ||
          'UNHANDLED_HTTP_EXCEPTION';

        return { message, code_error };
      }

      if (typeof res === 'string') {
        return { message: res, code_error: 'UNHANDLED_HTTP_EXCEPTION' };
      }
    }

    if (exception instanceof QueryError) {
      return {
        message: exception.message || 'Erro na query',
        code_error: 'QUERY_ERROR',
      };
    }

    if (exception instanceof QueryFailedError) {
      const errorObj: any = exception;
      return {
        message: errorObj.message || 'Erro de banco de dados',
        code_error: errorObj.code || 'QUERY_FAILED_ERROR',
      };
    }

    if (exception instanceof Error) {
      return { message: exception.message, code_error: 'INTERNAL_ERROR' };
    }

    return { message: 'Erro desconhecido', code_error: 'UNKNOWN_ERROR' };
  }

  private logMessage(
    request: any,
    message: IError,
    status: number,
    exception: any,
  ) {
    if ((status === 400 || status === 500) && request.file) {
      try {
        fs.unlinkSync(request.file.path);
      } catch {
        return;
      }
    }

    const logContent = `method=${request.method} status=${status} code_error=${message.code_error} message=${message.message}`;

    if (status >= 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        logContent,
        exception.stack,
      );
    } else {
      this.logger.warn(`End Request for ${request.path}`, logContent);
    }
  }
}
