export function uniqueArray<T extends Array<unknown>>(array: T): T {
  return Array.from(new Set(array)) as T;
}
