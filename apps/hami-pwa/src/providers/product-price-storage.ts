import { setProvider } from '@gecut/signal';

import { kyInstance } from './request-base';

import type { Routes } from '@gecut/types/hami/routes';

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
    .json<Routes['product-price-storage']>();
});
