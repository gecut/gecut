import { Projects } from '@gecut/types';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

nanoServer.route('PATCH', '/product-price-storage/', async (connection) => {
  logger.logMethod?.('patch-product-price-storage');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{
    data: Array<Partial<Projects.Hami.ProductPrice>>;
  }>();

  for (const productPrice of bodyJson.data) {
    await storageClient.set(
      Projects.Hami.productPriceRequire(productPrice),
      config.productPriceStorage
    );
  }

  return {
    ok: true,
    data: {},
  };
});
