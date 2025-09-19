import { InvalidParameterError } from '@/domain/errors';

type NumberInputFormat = string | number;

type NumberOutput = number;
type NumberType = (input: NumberInputFormat) => NumberOutput;

type DecimalOutput = string;
type DecimalType = (
  input: NumberInputFormat,
  decimal?: number,
) => DecimalOutput;

export const setupNumberType: NumberType = (input) => {
  if (input === undefined || input === null || !input) {
    throw new InvalidParameterError(`${input} is not a number`);
  }

  if (typeof input === 'string') {
    if (Number.isNaN(Number(input))) {
      throw new InvalidParameterError(`${input} is not a number`);
    }
    return Number(input);
  }
  return input;
};

export const setupDecimalType: DecimalType = (input, decimanl = 2) => {
  if (input === undefined || input === null || !input) {
    throw new InvalidParameterError(`${input} is not a number`);
  }

  if (typeof input === 'string') {
    if (Number.isNaN(Number(input))) {
      throw new InvalidParameterError(`${input} is not a number`);
    }

    return Number(input).toFixed(decimanl);
  }

  return input.toFixed(decimanl);
};
