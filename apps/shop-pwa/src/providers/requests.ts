
import { dataToQuery } from '../utils/query-params';

import { kyInstance } from './ky-instance';

import type { StringifyableRecord } from '@gecut/types';
import type { QueryParams } from '../utils/query-params';

export const requests = {
  getProductsList<T extends StringifyableRecord>(queryParams: QueryParams) {
    return kyInstance.get(`products?${dataToQuery(queryParams)}`).json<T>();
  },
};
