import { DomainError } from './domain.error';

export class RequiredFieldError extends DomainError {
  constructor(fieldName?: string) {
    const message =
      fieldName === undefined
        ? 'Field required'
        : `The field ${fieldName} is required`;
    super(message);
    this.name = 'RequiredFieldError';
  }
}
