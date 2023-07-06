import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

import type { Projects } from '@gecut/types';

setProvider('product-storage', async () => {
  return await fetchJSON<Projects.Hami.Routes['product-storage']>(
      'product-storage/'
  );
});
