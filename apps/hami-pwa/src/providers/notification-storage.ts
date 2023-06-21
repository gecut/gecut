import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

import type { Projects } from '@gecut/types';

setProvider('notification-storage', async () => {
  return await fetchJSON<Projects.Hami.Routes['notification-storage']>(
    'notification-storage/'
  );
});
