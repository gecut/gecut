export type Data<T> = T | null | undefined;

export const dataSanitize = <T extends Data<string>>(data: T): string => {
  return String(data ?? '');
};
