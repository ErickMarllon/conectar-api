import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { SortOptionDto } from '../dto/sort-option.dto';

interface InputQuery {
  sort?: string;
  [key: string]: any;
}

interface OutputQuery<T = any> {
  sort?: T[];
  [key: string]: any;
}

@Injectable()
export class ParseSortJsonPipe
  implements PipeTransform<InputQuery, Promise<OutputQuery<SortOptionDto>>>
{
  async transform(
    value: InputQuery,
    metadata: ArgumentMetadata,
  ): Promise<OutputQuery<SortOptionDto>> {
    if (metadata.type !== 'query') {
      return value as OutputQuery<SortOptionDto>;
    }
    if (!value?.sort || typeof value.sort !== 'string') {
      return value as OutputQuery<SortOptionDto>;
    }

    try {
      const parsed = JSON.parse(value.sort);

      if (!Array.isArray(parsed)) {
        throw new Error('Sort must be an array');
      }

      const instance = plainToInstance(SortOptionDto, parsed);

      const errors = validateSync(instance, { whitelist: true });
      if (errors.length > 0) {
        throw new BadRequestException('invalid paginate headers');
      }
      return {
        ...value,
        sort: instance,
      };
    } catch {
      throw new BadRequestException(
        'Invalid sort format. Expected JSON array of { property, order }',
      );
    }
  }
}
