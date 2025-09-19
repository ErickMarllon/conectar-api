import { differenceInMinutes, parseISO } from 'date-fns';

const getDate = (val: unknown): Date | null => {
  if (!val) return null;
  if (typeof val === 'string' || val instanceof Date)
    return typeof val === 'string' ? parseISO(val) : val;
  return null;
};

export const hasRecent = <T>(
  prop?: T | T[] | null,
  key: string = 'updated_at',
  activeMinutes = 5,
): boolean => {
  if (!prop) return false;

  const propArray = Array.isArray(prop) ? prop : [prop];

  const latest = propArray.reduce<T | null>((prev, curr) => {
    if (!prev) return curr;
    const prevDate = getDate(prev[key]);
    const currDate = getDate(curr[key]);
    if (!currDate) return prev;
    if (!prevDate) return curr;
    return currDate > prevDate ? curr : prev;
  }, null);

  if (!latest) return false;
  const latestDate = getDate(latest[key]);
  if (!latestDate) return false;
  return differenceInMinutes(new Date(), latestDate) <= activeMinutes;
};
