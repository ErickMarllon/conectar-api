export function getChangedFields<T extends object>(
  current: T,
  updates: Partial<T>,
): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined && value !== null && value !== '') {
      if (current[key as keyof T] !== value) {
        (result as T)[key] = value;
      }
    }
  }
  return result;
}
