import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

setProvider('patch-notification-storage', async (jsonBody) => {
  return await fetchJSON<Record<string, never>>('notification-storage/', {
    method: 'patch',
    json: jsonBody,
  });
});
