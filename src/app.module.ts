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
import { configurations } from './infrastructure/config/config';
import { DatabaseConfig } from './infrastructure/config/types/database-config.type';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: configurations,
      envFilePath: ['.env.local', '.env'],
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
