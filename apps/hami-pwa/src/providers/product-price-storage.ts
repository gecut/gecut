import { setProvider } from '@gecut/signal';

import { kyInstance } from './request-base';

import type { Projects } from '@gecut/types';

setProvider('product-price-storage', async () => {
  return await kyInstance
    .get('product-price-storage/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('USER_TOKEN')}`,
      },
      searchParams: {
        uid: 0,
      },
    })
    .json<Projects.Hami.Routes['product-price-storage']>();
});
