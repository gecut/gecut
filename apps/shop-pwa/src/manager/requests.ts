
import { kyInstance } from './ky-instance';
import { dataToQuery } from './query-params';

import type { StringifyableRecord } from '@gecut/types';
import type { QueryParams } from './query-params';

export const requests = {
  getProductsList<T extends StringifyableRecord>(queryParams: QueryParams) {
    return kyInstance.get(`products?${dataToQuery(queryParams)}`).json<T>();
  },
};
