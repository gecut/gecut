import {config, logger} from '../lib/config';
import {nanoServer} from '../lib/server';
import {storageClient} from '../lib/storage';
import {requireAdmin} from '../util/require-admin';

import type {ProductPrice} from '@gecut/types/hami/product-price';

nanoServer.route('PATCH', '/product-price-row-list/', async (connection) => {
  logger.logMethod('patch-product-price-row-list');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{data: Array<ProductPrice>}>();

  for (const product of bodyJson.data) {
    await storageClient.set(product, config.productPriceStorage);
  }

  return {
    ok: true,
    data: {},
  };
});
