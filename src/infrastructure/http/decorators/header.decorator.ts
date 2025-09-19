import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const paginateHeaders = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers;
  },
);
