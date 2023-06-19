import { Projects } from '@gecut/types';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

nanoServer.route('PATCH', '/customer-project-storage/', async (connection) => {
  logger.logMethod?.('patch-customer-storage');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<Projects.Hami.PatchRoutes['patch-customer-project-storage']>();

  for (let customer of bodyJson.data) {
    customer = await storageClient.set(
      Projects.Hami.customerProjectRequire(customer),
      config.customerProjectStoragePrefix + bodyJson.customerId
    );
  }

  return {
    ok: true,
    data: {},
  };
});
