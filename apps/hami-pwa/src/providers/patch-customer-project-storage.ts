import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

setProvider('patch-customer-project-storage', async (jsonBody) => {
  return await fetchJSON<Record<string, never>>('customer-project-storage/', {
    method: 'patch',
    json: jsonBody,
  });
});
