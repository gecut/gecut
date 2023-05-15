import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireSignedIn } from '../util/require-signed-in';

import type { Projects } from '@gecut/types';

nanoServer.route('GET', '/product-price-storage/', async (connection) => {
  logger.logMethod('get-product-price-storage');

  await requireSignedIn(connection);

  return await storageClient.getStorage<Projects.Hami.ProductPrice>(
    config.productPriceStorage
  );
});
