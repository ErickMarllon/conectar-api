import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [UsersModule, HealthModule, AuthenticationModule],
  exports: [UsersModule, HealthModule, AuthenticationModule],
})
export class ApiModule {}
