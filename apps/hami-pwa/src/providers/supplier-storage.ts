import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

import type { Projects } from '@gecut/types';

setProvider('supplier-storage', async () => {
  return await fetchJSON<Projects.Hami.Routes['supplier-storage']>(
      'supplier-storage/'
  );
});
