import { PgsqlProduct } from './product';
import { PgsqlService } from './service';

export class PgsqlMedia {
  id: string;
  original_file_name: string;
  path: string;
  is_main: boolean;
  created_at: Date;
  updated_at: Date;
  product?: PgsqlProduct | null;
  service?: PgsqlService | null;

  constructor(input: PgsqlMedia) {
    Object.assign(this, input);
  }
}
