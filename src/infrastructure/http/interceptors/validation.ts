import {
  InvalidParameterError,
  QueryError,
  RequiredFieldError,
  UnauthorizedError,
} from '@/domain/errors';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof UnauthorizedError) {
          throw new UnauthorizedException(err.message);
        } else if (err instanceof QueryError) {
          throw new BadRequestException(err.message);
        } else if (err instanceof RequiredFieldError) {
          throw new BadRequestException(err.message);
        } else if (err instanceof InvalidParameterError) {
          throw new BadRequestException(err.message);
        } else {
          throw err;
        }
      }),
    );
  }
}
