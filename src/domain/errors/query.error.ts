import { DomainError } from './domain.error';

export class QueryError extends DomainError {
  constructor(message?: string) {
    super(message ?? 'Query error');
    this.name = 'QueryError';
  }
}
