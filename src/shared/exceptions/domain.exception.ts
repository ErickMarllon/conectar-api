export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}

export class UserNotFoundException extends DomainException {
  constructor(id: string) {
    super(`User with ID "${id}" not found`);
    this.name = 'UserNotFoundException';
  }
}

export class EmailAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super(`Email "${email}" already exists`);
    this.name = 'EmailAlreadyExistsException';
  }
}
