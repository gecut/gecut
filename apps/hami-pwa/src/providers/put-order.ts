import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

setProvider('put-order', async (jsonBody) => {
  return await fetchJSON<Record<string, never>>('order/', {
    method: 'put',
    json: jsonBody,
  });
});
