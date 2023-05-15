import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireSignedIn } from '../util/require-signed-in';

import type { Supplier } from '@gecut/types/hami/supplier';

nanoServer.route('GET', '/supplier-list/', async (connection) => {
  logger.logMethod('get-supplier-list');

  await requireSignedIn(connection);

  return await storageClient.getStorage<Supplier>(config.supplierStorage);
});
