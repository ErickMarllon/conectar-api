export const CRYPTO_GATEWAY = Symbol('CRYPTO_GATEWAY');
export interface CryptoGateway {
  hash(value: string): Promise<string>;
  verify(hash: string, value: string): Promise<boolean>;
}
