import { setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

import type { Projects } from '@gecut/types';

setProvider('user', async () => {
  return (await fetchJSON<Projects.Hami.Routes['user']>('user/')).data;
});
