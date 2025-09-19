import { IJwtService } from '@/domain/contracts/auth/jwt-service.interface';
import { IAwsService } from '@/domain/contracts/gateways/awss3';
import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import {
  ISessionRepository,
  IUserAuthRepository,
} from '@/domain/contracts/pgsql/repositories';
import { createSigninUseCase } from '@/domain/usecase/pgsql/user/auth';
import { AwsS3Module } from '@/infrastructure/config/aws-s3/aws-s3.module';
import { AwsS3Service } from '@/infrastructure/config/aws-s3/aws-s3.service';

import {
  PgsqlSessionRepository,
  PgsqlUserRepository,
} from '@/infrastructure/database/pgsql';
import { PgsqlModule } from '@/infrastructure/database/pgsql/pgsql.module';
import { Argon2Service } from '@/infrastructure/gateways/crypto/argon2.service';
import { CryptoModule } from '@/infrastructure/gateways/crypto/crypto.module';
import { JwtConfigModule } from '@/infrastructure/providers/jwt';
import { JwtTokenService } from '@/infrastructure/providers/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({
  imports: [PgsqlModule, JwtConfigModule, CryptoModule, AwsS3Module],
})
export class SigninFactoryModule {
  static SIGNIN_USECASE = 'SIGNIN_USECASE';

  static register(): DynamicModule {
    const exports = [SigninFactoryModule.SIGNIN_USECASE];

    return {
      module: SigninFactoryModule,
      providers: [
        {
          provide: SigninFactoryModule.SIGNIN_USECASE,
          inject: [
            PgsqlUserRepository,
            PgsqlSessionRepository,
            JwtTokenService,
            Argon2Service,
            AwsS3Service,
          ],

          useFactory: (
            usersRepo: IUserAuthRepository,
            sessionRepo: ISessionRepository,
            jwtService: IJwtService,
            crypto: CryptoGateway,
            awsS3: IAwsService,
          ) =>
            createSigninUseCase(
              usersRepo,
              sessionRepo,
              jwtService,
              crypto,
              awsS3,
            ),
        },
      ],
      exports,
    };
  }
}
