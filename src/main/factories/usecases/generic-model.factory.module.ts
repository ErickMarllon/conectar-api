import { getAnyEntity } from '@/domain/usecase/pgsql/getAnyEntity';
import { RawRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule] })
export class GenericEntityFactoryModule {
  static GET_ANY_ENTITY = 'GET_ANY_ENTITY';

  static register(): DynamicModule {
    const exports = [GenericEntityFactoryModule.GET_ANY_ENTITY];
    return {
      module: GenericEntityFactoryModule,
      providers: [
        {
          inject: [RawRepository],
          provide: GenericEntityFactoryModule.GET_ANY_ENTITY,
          useFactory: (rawRepo: RawRepository) => getAnyEntity(rawRepo),
        },
      ],
      exports,
    };
  }
}
