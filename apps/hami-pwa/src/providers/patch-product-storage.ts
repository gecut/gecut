import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

setProvider('patch-product-storage', async (jsonBody) => {
  return await fetchJSON<Record<string, never>>('product-storage/', {
    method: 'patch',
    json: jsonBody,
  });
});
