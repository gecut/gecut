import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

import type { Projects } from '@gecut/types';

setProvider('order-storage', async () => {
  return await fetchJSON<Projects.Hami.Routes['order-storage']>(
    'order-storage/'
  );
});
