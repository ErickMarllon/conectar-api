import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { SortOptionDto } from '../dto/sort-option.dto';

export async function validateSortItems(sortItems: SortOptionDto[]) {
  const validationResults = await Promise.all(
    sortItems.map((item) => validate(item)),
  );
  const errors = validationResults.flat();
  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }
}
