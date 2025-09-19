import { CRYPTO_GATEWAY } from '@/domain/contracts/gateways/crypto.gateway';
import { Module } from '@nestjs/common';
import { Argon2Service } from './argon2.service';

@Module({
  providers: [
    Argon2Service,
    {
      provide: CRYPTO_GATEWAY,
      useExisting: Argon2Service,
    },
  ],
  exports: [CRYPTO_GATEWAY, Argon2Service],
})
export class CryptoModule {}
