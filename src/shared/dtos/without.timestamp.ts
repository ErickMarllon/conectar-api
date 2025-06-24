export type WithoutTimestamp<T> = Omit<T, 'created_at' | 'updated_at'>;
