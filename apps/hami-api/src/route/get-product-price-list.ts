import {config, logger} from '../lib/config';
import {nanoServer} from '../lib/server';
import {storageClient} from '../lib/storage';
import {requireSignedIn} from '../util/require-signed-in';

import type {ProductPrice} from '@gecut/types/hami/product-price';

nanoServer.route('GET', '/product-price-list/', async (connection) => {
  logger.logMethod('get-product-price-list');

  await requireSignedIn(connection);

  return await storageClient.getStorage<ProductPrice>(config.productPriceStorage);
});
