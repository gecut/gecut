import { Projects } from '@gecut/types';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

nanoServer.route('PATCH', '/customer-storage/', async (connection) => {
  logger.logMethod?.('patch-customer-storage');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{
    data: Array<Partial<Projects.Hami.Customer>>;
  }>();

  for (let customer of bodyJson.data) {
    customer = await storageClient.set(
      Projects.Hami.customerRequire(customer),
      config.customerStorage
    );
  }

  return {
    ok: true,
    data: {},
  };
});
