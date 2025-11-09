import { CryptoGateway } from '@/domain/contracts/gateways/crypto.gateway';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2Service implements CryptoGateway {
  async hash(value: string): Promise<string> {
    try {
      return await argon2.hash(value);
    } catch (_err) {
      throw new Error('Can not hash password.');
    }
  }

  async verify(hash: string, value: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, value);
    } catch (_err) {
      return false;
    }
  }
}
