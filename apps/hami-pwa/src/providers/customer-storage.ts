import { setProvider } from '@gecut/signal';

import { fetchJSON } from './request-base';

import type { Projects } from '@gecut/types';

setProvider('customer-storage', async () => {
  return await fetchJSON<Projects.Hami.Routes['customer-storage']>(
    'customer-storage/',
    {
      method: 'get',
      searchParams: {
        uid: 0,
      },
    }
  );
});
