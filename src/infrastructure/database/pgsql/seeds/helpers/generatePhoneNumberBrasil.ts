import { faker } from '@faker-js/faker';

export function generatePhoneNumberBrasil(): string {
  const ddd = faker.helpers.arrayElement([
    '11',
    '21',
    '31',
    '41',
    '51',
    '61',
    '71',
    '81',
    '91',
  ]);
  const numero = faker.string.numeric(8);
  return `+55${ddd}9${numero}`;
}
