import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireSignedIn } from '../util/require-signed-in';

import type { Projects } from '@gecut/types';

nanoServer.route('GET', '/order-storage/', async (connection) => {
  logger.logMethod('get-order-storage');

  const user = await requireSignedIn(connection);
  const orderStorage = await storageClient.getStorage<Projects.Hami.Order>(
    config.orderStorage
  );

  if (user.role === 'admin') {
    return orderStorage;
  }

  return {
    ...orderStorage,
    data: Object.fromEntries(
      Object.entries(orderStorage.data).filter(
        (order) => order[1].creatorId === user.id
      )
    ),
  };
});
