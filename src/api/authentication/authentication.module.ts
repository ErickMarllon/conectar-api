import { Session } from '@/database/entities/session-typeorm.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MetaStrategy } from './strategy/meta.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([Session]),
    UsersModule,
    CacheModule.register({
      ttl: 5 * 60 * 1000,
    }),
  ],
  providers: [
    AuthenticationService,
    GoogleStrategy,
    MetaStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
