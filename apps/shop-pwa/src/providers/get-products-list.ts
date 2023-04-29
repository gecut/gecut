import { setProvider } from '@gecut/signal';

import { kyInstance } from './ky-instance';

import type { Product } from '@gecut/types';

setProvider('products', async (param) => {
  return await kyInstance
      .get('products', { searchParams: param })
      .json<Product[]>();
});
