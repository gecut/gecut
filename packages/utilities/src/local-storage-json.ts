import { parseJson } from './parse-json';

import type { Stringifyable } from '@gecut/types';

export const getLocalStorageItem = <T extends Stringifyable>(
  name: string,
  defaultValue: T
): T => {
  const value = localStorage.getItem(name);
  if (value === 'null' || value === 'undefined') return defaultValue;
  return value == null ? defaultValue : parseJson(value) ?? defaultValue;
};

export const setLocalStorageItem = <T extends Stringifyable>(
  name: string,
  value: T
): void => {
  if (value == null) {
    localStorage.removeItem(name);
  }
  localStorage.setItem(name, JSON.stringify(value));
};
