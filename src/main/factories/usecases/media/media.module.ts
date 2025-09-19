import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { IMediaRepository } from '@/domain/contracts/pgsql/repositories';
import {
  setupMediaDelete,
  setupMediaSave,
  setupMediaUpdate,
} from '@/domain/usecase/pgsql/media';

import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';
import { MediaRepository } from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { DynamicModule, Module } from '@nestjs/common';

@Module({ imports: [PgsqlModule, AwsS3Module] })
export class MediaFactoryModule {
  static SAVE_MEDIA = 'SAVE_MEDIA';
  static DELETE_MEDIA = 'DELETE_MEDIA';
  static UPDATE_MEDIA = 'UPDATE_MEDIA';

  static register(): DynamicModule {
    const exports = [
      MediaFactoryModule.SAVE_MEDIA,
      MediaFactoryModule.DELETE_MEDIA,
      MediaFactoryModule.UPDATE_MEDIA,
    ];
    return {
      module: MediaFactoryModule,
      providers: [
        {
          inject: [MediaRepository, AwsS3Service],
          provide: MediaFactoryModule.SAVE_MEDIA,
          useFactory: (
            mediaRepo: IMediaRepository,
            awsS3Service: IAwsService,
          ) => setupMediaSave(mediaRepo, awsS3Service),
        },
        {
          inject: [MediaRepository, AwsS3Service],
          provide: MediaFactoryModule.DELETE_MEDIA,
          useFactory: (mediaRepo: MediaRepository, awsS3Service: IAwsService) =>
            setupMediaDelete(mediaRepo, awsS3Service),
        },
        {
          inject: [MediaRepository],
          provide: MediaFactoryModule.UPDATE_MEDIA,
          useFactory: (mediaRepo: MediaRepository) =>
            setupMediaUpdate(mediaRepo),
        },
      ],
      exports,
    };
  }
}
