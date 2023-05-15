import { productPriceRequire } from '@gecut/types/hami/product-price';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

import type { ProductPrice } from '@gecut/types/hami/product-price';

nanoServer.route('PATCH', '/product-price-storage/', async (connection) => {
  logger.logMethod('patch-product-price-storage');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{
    data: Array<Partial<ProductPrice>>;
  }>();

  for (const productPrice of bodyJson.data) {
    await storageClient.set(
      productPriceRequire(productPrice),
      config.productPriceStorage
    );
  }

  return {
    ok: true,
    data: {},
  };
});
