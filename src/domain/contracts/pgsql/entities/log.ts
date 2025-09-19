export class PgsqlLogM {
  id: number;
  loggable_type: PgsqlLogMLoggableTypeEnum;
  loggable_id: number;
  operation: PgsqlLogMOperationTypesEnum;
  data: object;
  user_id: number;
  created_at?: Date;

  constructor(input: Omit<PgsqlLogM, 'id'> & Partial<Pick<PgsqlLogM, 'id'>>) {
    Object.assign(this, input);
  }
}

export enum PgsqlLogMOperationTypesEnum {
  CREATE = 'create',
  UPDATE = 'update',
}
export enum PgsqlLogMLoggableTypeEnum {
  CONTENT = 'App\\Models\\Core\\Content',
  ITEM = 'App\\Models\\Core\\Item',
}

export const logCreated = (data: object, keysToIgnore: string[] = []) => {
  const objToReturn = {};

  Object.keys(data).forEach((key) => {
    if (!keysToIgnore.includes(key)) objToReturn[key] = { new: data[key] };
  });
  return objToReturn;
};

export const logUpdated = (
  dataNew: object,
  dataOld: object,
  keysToIgnore: string[] = [],
) => {
  const objToReturn = {};

  Object.keys(dataNew).forEach((key) => {
    if (!keysToIgnore.includes(key))
      objToReturn[key] = { new: dataNew[key], old: dataOld[key] };
  });
  return objToReturn;
};
