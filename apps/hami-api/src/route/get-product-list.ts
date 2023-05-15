import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireSignedIn } from '../util/require-signed-in';

import type { Product } from '@gecut/types/hami/product';

nanoServer.route('GET', '/product-list/', async (connection) => {
  logger.logMethod('get-product-list');

  await requireSignedIn(connection);

  return await storageClient.getStorage<Product>(config.productStorage);
});
