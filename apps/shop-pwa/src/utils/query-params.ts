export type QueryParams = Record<string, string>;

export const dataToQuery = (data: QueryParams) => {
  return new URLSearchParams(data).toString();
};
