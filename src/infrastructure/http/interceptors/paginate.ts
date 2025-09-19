import { PaginateMode } from '@/shared/enums';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class paginateResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const restMode = req.headers['rest-mode'];

    const isPaginate = Object.values(PaginateMode).includes(
      restMode as PaginateMode,
    );

    if (isPaginate) {
      return next.handle().pipe(
        map((data) => {
          if (data && data.items && data.meta) {
            return {
              data: data.items,
              meta: data.meta,
            };
          }
          return data;
        }),
      );
    }

    return next.handle();
  }
}
