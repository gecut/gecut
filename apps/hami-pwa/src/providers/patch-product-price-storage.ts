import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

setProvider('patch-product-price-storage', async (jsonBody) => {
  return await fetchJSON<Record<string, never>>('product-price-storage/', {
    method: 'patch',
    json: jsonBody,
  });
});
