import { GetAnyEntity } from '@/domain/usecase/pgsql/getAnyEntity';
import { paginateHeaders } from '@/infrastructure/http/decorators/header.decorator';
import { Public } from '@/infrastructure/http/decorators/public-routes.decorator';
import { GenericEntityFactoryModule } from '@/main/factories/usecases/generic-model.factory.module';
import { PaginateOptions } from '@/shared/paginate/types';

import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('generic')
@Controller('generic')
export class GenericEntityController {
  constructor(
    @Inject(GenericEntityFactoryModule.GET_ANY_ENTITY)
    private readonly getAnyEntity: GetAnyEntity,
  ) {}

  @Public()
  @ApiQuery({
    name: 'columns',
    required: false,
    description:
      'columns: colunas separadas por vírgula. Retorna id e name por padrão',
  })
  @ApiQuery({
    name: 'order_by',
    required: false,
    description: 'name+ASC, created_at+DESC',
  })
  @ApiQuery({
    name: 'with_imagem',
    required: false,
    type: () => Boolean,
    description: 'Retornar listagem com imagens da entidade',
  })
  @ApiQuery({
    name: 'is_active',
    required: false,
    description:
      'Colunas presentes na tabela a ser filtrada. Exemplo: filtrar por ativo',
    type: () => Boolean,
  })
  @ApiHeader({
    name: 'rest-mode',
    required: false,
    schema: { enum: ['paginate', 'list'] },
  })
  @ApiHeader({ name: 'rest-page', required: false, schema: { type: 'string' } })
  @ApiHeader({
    name: 'rest-limit',
    required: false,
    schema: { type: 'string' },
  })
  @Get('/:table_name')
  async getAny(
    @Param('table_name') table_name: string,
    @Query() query: Record<string, any>,
    @paginateHeaders() meta: PaginateOptions,
  ) {
    this.sqlInjectionValidate(table_name, query);

    this.validateQueryParams({ ...query });

    return this.getAnyEntity({ tableName: table_name, query, meta });
  }

  validateQueryParams(query: Record<string, any>) {
    let message: string = '';

    if ('with_image' in query && typeof query['with_image'] === 'boolean') {
      message = "Valor inválido para o campo 'with_image'.";
    }
    if ('is_active' in query && typeof query['is_active'] === 'boolean'!) {
      message = "Valor inválido para o campo 'is_active'.";
    }
    if ('order_by' in query) {
      if (query['order_by'].includes('+')) {
        const columnOrders = query['order_by']
          .split(',')
          .filter((column) => column != '');

        columnOrders.forEach((column: string) => {
          const [_, order] = column.split('+');

          if (!['ASC', 'DESC'].includes(order.toUpperCase())) {
            message = 'Parâmetro de ordenação incorreto.';
          }
        });
      }
    }

    if (message) {
      throw new BadRequestException(message);
    }
  }

  private sqlInjectionValidate(table_name: string, query: object) {
    const forbiddenError = (message: string) => {
      throw new ForbiddenException(message);
    };

    const operations_not_permitted = [
      'drop',
      'update',
      'delete',
      'insert',
      'alter',
      'truncate',
      'create',
      'grant',
      'revoke',
      'rename',
    ];

    if (table_name.toLocaleLowerCase().includes(' ')) {
      forbiddenError('Nome da tabela inválido: ' + table_name);
    }

    operations_not_permitted.forEach((operation) => {
      if (table_name.toLocaleLowerCase().includes(operation)) {
        forbiddenError(
          `Tabela inválida, operação não permetida: ${operation}, tabela: ${table_name}`,
        );
      }
    });

    Object.keys(query).forEach((key) => {
      if (key.toLocaleLowerCase().includes(' ')) {
        forbiddenError('chave do objeto query inválida: ' + key);
      }
      let str = query[key].toLocaleLowerCase();
      str = str.replace('created_at', '');
      str = str.replace('updated_at', '');
      str = str.replace('deleted_at', '');

      operations_not_permitted.forEach((operation) => {
        if (str.includes(operation)) {
          forbiddenError(
            `String inválida, operação não permetida: ${operation}, string: ${str}`,
          );
        }
      });
    });
  }
}
