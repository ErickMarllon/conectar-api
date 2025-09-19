import { Payload, PayloadGenerateRes, PayloadInput } from './jwt';

export interface IJwtService {
  checkToken(input: PayloadInput): Promise<Payload>;
  generateTokens(payload: Payload): Promise<PayloadGenerateRes>;
}
