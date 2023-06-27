import type { Nullable } from '@gecut/types';

const numberSanitizer = <T extends Nullable<number>>(
  data: T
): NonNullable<T> => {
  return Number(data ?? 0) as NonNullable<T>;
};

const stringSanitizer = <T extends Nullable<string>>(
  data: T
): NonNullable<T> => {
  return String(data ?? '') as NonNullable<T>;
};

export const sanitizer = {
  int: numberSanitizer,
  str: stringSanitizer,
};
