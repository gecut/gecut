import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

import type { Projects } from '@gecut/types';

nanoServer.route('PATCH', '/customer-list/', async (connection) => {
  logger.logMethod('patch-customer-list');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{
    data: Array<Projects.Hami.Customer>;
  }>();

  for (const customer of bodyJson.data) {
    await storageClient.set(customer, config.customerStorage);
  }

  return {
    ok: true,
    data: {},
  };
});
