export function cleanObject<T extends Record<string, any> | undefined>(
  obj: T,
): Partial<NonNullable<T>> {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  ) as Partial<NonNullable<T>>;
}
