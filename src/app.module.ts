import { Session } from '@/database/entities/session-typeorm.entity';
import { User } from '@/database/entities/user-typeorm.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { JwtAuthGuard } from './api/authentication/guard/jwt.guard';
import { RolesGuard } from './api/authentication/guard/roles.guard';
import appConfig from './infrastructure/config/app.config';
import authConfig from './infrastructure/config/auth.config';
import databaseConfig from './infrastructure/config/database.config';
import googleConfig from './infrastructure/config/google.config';
import jwtConfig from './infrastructure/config/jwt.config';
import metaConfig from './infrastructure/config/meta.config';
import { DatabaseConfig } from './infrastructure/config/types/database-config.type';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        jwtConfig,
        appConfig,
        authConfig,
        googleConfig,
        metaConfig,
      ],
      envFilePath: ['.env.docker', '.env'],
      cache: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.getOrThrow<DatabaseConfig>('database');

        return {
          type: 'postgres',
          url: dbConfig.url,
          entities: [Session, User],
          ssl: { rejectUnauthorized: false },
        };
      },
    }),

    CacheModule.register({
      ttl: 5 * 60 * 1000,
    }),
    ApiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
