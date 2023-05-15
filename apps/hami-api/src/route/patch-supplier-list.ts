import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

import type { Projects } from '@gecut/types';

nanoServer.route('PATCH', '/supplier-list/', async (connection) => {
  logger.logMethod('patch-supplier-list');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{
    data: Array<Projects.Hami.Supplier>;
  }>();

  for (const supplier of bodyJson.data) {
    await storageClient.set(supplier, config.supplierStorage);
  }

  return {
    ok: true,
    data: {},
  };
});
