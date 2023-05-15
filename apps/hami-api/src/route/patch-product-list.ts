import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

import type { Projects } from '@gecut/types';

nanoServer.route('PATCH', '/product-list/', async (connection) => {
  logger.logMethod('patch-product-list');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{
    data: Array<Projects.Hami.Product>;
  }>();

  for (const product of bodyJson.data) {
    await storageClient.set(product, config.productStorage);
  }

  return {
    ok: true,
    data: {},
  };
});
