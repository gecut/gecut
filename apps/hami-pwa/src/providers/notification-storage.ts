import { setProvider } from '@gecut/signal';

import { fetchJSON } from './request-base';

import type { Projects } from '@gecut/types';

setProvider('notification-storage', async () => {
  return await fetchJSON<Projects.Hami.Routes['notification-storage']>(
    'notification-storage/',
    {
      method: 'get',
      searchParams: {
        uid: 0,
      },
    }
  );
});
