import { Projects } from '@gecut/types';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

nanoServer.route('PATCH', '/supplier-storage/', async (connection) => {
  logger.logMethod?.('patch-supplier-storage');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<
    Projects.Hami.PatchRoutes['patch-supplier-storage']
  >();

  for (const supplier of bodyJson.data) {
    await storageClient.set(
        Projects.Hami.supplierRequire(supplier),
        config.supplierStorage
    );
  }

  return {
    ok: true,
    data: {},
  };
});
