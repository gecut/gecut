import { Projects } from '@gecut/types';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

nanoServer.route('PATCH', '/customer-project-storage/', async (connection) => {
  logger.logMethod('patch-customer-storage');

  await requireAdmin(connection);

  const params = connection.requireQueryParams<{ 'customer-id': string }>({
    'customer-id': 'string',
  });
  const customerId = params['customer-id'];
  const bodyJson = await connection.requireJsonBody<{
    data: Array<Partial<Projects.Hami.CustomerProject>>;
  }>();

  for (let customer of bodyJson.data) {
    customer = await storageClient.set(
      Projects.Hami.customerRequire(customer),
      config.customerProjectStoragePrefix + customerId
    );
  }

  return {
    ok: true,
    data: {},
  };
});
