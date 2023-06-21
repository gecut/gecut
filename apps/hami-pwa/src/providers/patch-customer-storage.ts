import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

setProvider('patch-customer-storage', async (jsonBody) => {
  return await fetchJSON<Record<string, never>>('customer-storage/', {
    method: 'patch',
    json: jsonBody,
  });
});
