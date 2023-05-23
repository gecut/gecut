import { Projects } from '@gecut/types';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

nanoServer.route('PATCH', '/product-storage/', async (connection) => {
  logger.logMethod('patch-product-storage');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{
    data: Array<Partial<Projects.Hami.Product>>;
  }>();

  for (const product of bodyJson.data) {
    await storageClient.set(
      Projects.Hami.productRequire(product),
      config.productStorage
    );
  }

  return {
    ok: true,
    data: {},
  };
});
