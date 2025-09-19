import { Order, PaginateMode } from '@/shared/enums';
import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export const ApiPaginateHeaders = (): MethodDecorator => {
  return applyDecorators(
    ApiHeader({
      name: 'rest-mode',
      required: false,
      enum: PaginateMode,
      schema: {
        type: 'offset | cursor | list',
        default: PaginateMode.OFFSET,
      },

      description: 'Tipo de paginação: offset | cursor | list',
    }),
    ApiHeader({
      name: 'rest-offset',
      required: false,
      description: 'Offset para paginação do tipo offset',
      schema: { type: 'integer', minimum: 1, default: 1 },
    }),
    ApiHeader({
      name: 'rest-limit',
      required: false,
      description: 'Limite de itens por página',
      schema: { type: 'integer', minimum: 1, default: 5 },
    }),
    ApiHeader({
      name: 'rest-cursor',
      required: false,
      description: 'Cursor base64 para paginação do tipo cursor',
    }),
    ApiHeader({
      name: 'rest-order',
      required: false,
      enum: Order,
      description: 'Ordem de ordenação: ASC | DESC',
    }),
    ApiHeader({
      name: 'rest-sortby',
      required: false,
      description: 'Ordenar por Propriedade',
    }),
    ApiHeader({
      name: 'rest-sort',
      required: false,
      description:
        'Ordenação múltipla em JSON. Ex: [{"property":"id","order":"ASC"}]',
      schema: { type: 'string', example: '[{"property":"id","order":"ASC"}]' },
    }),
  );
};
