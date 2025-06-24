import { applyDecorators } from '@nestjs/common';
import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { IsString, NotEquals } from 'class-validator';
import { IsNullable } from './validators/is-nullable.decorator';
import { IsStrongPassword } from './validators/is-strong-password.decorator';

interface IFieldOptions {
  each?: boolean;
  swagger?: boolean;
  nullable?: boolean;
  groups?: string[];
}

interface IStringFieldOptions extends IFieldOptions {
  minLength?: number;
  maxLength?: number;
  toLowerCase?: boolean;
  toUpperCase?: boolean;
}

export function StrongPasswordField(
  options: ApiPropertyOptions & IStringFieldOptions = {},
): PropertyDecorator {
  const decorators = [IsString(), IsStrongPassword()];

  if (options.nullable) {
    decorators.push(IsNullable());
  } else {
    decorators.push(NotEquals(null));
  }
  if (options) {
    decorators.unshift(ApiProperty(options));
  }
  return applyDecorators(...decorators);
}
