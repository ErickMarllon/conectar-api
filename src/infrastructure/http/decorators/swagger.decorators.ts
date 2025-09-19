import { CursorPaginateDto, OffsetpaginateDto } from '@/shared/paginate/dto';
import { type Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  type ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiPaginatedResponse = <T extends Type<any>>(options: {
  type: T;
  description?: string;
  paginateType?: 'offset' | 'cursor';
}): MethodDecorator => {
  return applyDecorators(
    ApiExtraModels(
      options.paginateType === 'offset' ? OffsetpaginateDto : CursorPaginateDto,
      options.type,
    ),
    ApiOkResponse({
      description:
        options.description || `Paginated list of ${options.type.name}`,
      schema: {
        title: `PaginatedResponseOf${options.type.name}`,
        allOf: [
          {
            $ref: getSchemaPath(
              options.paginateType === 'offset'
                ? OffsetpaginateDto
                : CursorPaginateDto,
            ),
          },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        ],
      },
    } as ApiResponseOptions | undefined),
  );
};
