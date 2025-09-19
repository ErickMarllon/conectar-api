import { DomainError } from './domain.error';

export class InvalidParameterError extends DomainError {
  constructor(message?: string) {
    super(message ?? 'Invalid parameter');
    this.name = 'InvalidParameterError';
  }
}
