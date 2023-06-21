import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

setProvider('patch-supplier-storage', async (jsonBody) => {
  return await fetchJSON<Record<string, never>>('supplier-storage/', {
    method: 'patch',
    json: jsonBody,
  });
});
