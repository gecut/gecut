import { setProvider } from '@gecut/signal';

import { fetchJSON } from './request-base';

import type { Projects } from '@gecut/types';

setProvider('order-storage', async () => {
  return await fetchJSON<Projects.Hami.Routes['order-storage']>(
    'order-storage/',
    {
      method: 'get',
      searchParams: {
        uid: 0,
      },
    }
  );
});
