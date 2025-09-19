import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { PaginateMode } from '../enums';
import { paginateInputDto } from '../paginate/dto';
import { PaginateOptions } from '../paginate/types';

@Injectable()
export class ParsepaginatePipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata): PaginateOptions {
    if (!value) {
      return value;
    }

    const isValidMode = Object.values(PaginateMode).includes(
      value['rest-mode'] as PaginateMode,
    );

    if (!isValidMode) {
      return value;
    }

    const instance = plainToInstance(paginateInputDto, value, {
      excludeExtraneousValues: true,
    });

    const errors = validateSync(instance, { whitelist: true });
    if (errors.length > 0) {
      throw new BadRequestException('invalid paginate headers');
    }
    return {
      mode: instance['rest-mode'],
      offset: instance['rest-offset'],
      limit: instance['rest-limit'],
      order: instance['rest-order'],
      sortBy: instance['rest-sortby'],
      sort: instance['rest-sort'],
      cursor: instance['rest-cursor'],
    };
  }
}
