import { type Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  type ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { OffsetPaginatedDto } from '../dtos/offset-pagination/paginated.dto';

export const ApiPaginatedResponse = <T extends Type<any>>(options: {
  type: T;
  description?: string;
}): MethodDecorator => {
  return applyDecorators(
    ApiExtraModels(OffsetPaginatedDto, options.type),
    ApiOkResponse({
      description:
        options.description || `Paginated list of ${options.type.name}`,
      schema: {
        title: `PaginatedResponseOf${options.type.name}`,
        allOf: [
          {
            $ref: getSchemaPath(OffsetPaginatedDto),
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
