import { PgsqlLogMLoggableTypeEnum, PgsqlLogMOperationTypesEnum } from './log';

export class PgsqlLog {
  id: number;
  loggable_type: PgsqlLogMLoggableTypeEnum;
  loggable_id: number;
  operation: PgsqlLogMOperationTypesEnum;
  data: object;
  user_id: number;
  created_at?: Date;

  constructor(input: PgsqlLog) {
    Object.assign(this, input);
  }
}
