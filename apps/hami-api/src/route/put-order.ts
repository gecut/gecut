import { Projects } from '@gecut/types';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireSignedIn } from '../util/require-signed-in';

nanoServer.route('PUT', '/order/', async (connection) => {
  logger.logMethod?.('put-order');

  const user = await requireSignedIn(connection);

  const bodyJson = await connection.requireJsonBody<
    Partial<Projects.Hami.Order>
  >();

  let oldOrder = {};

  if (bodyJson.id != null) {
    oldOrder = await storageClient.get(bodyJson.id, config.orderStorage);
  }

  const order = Projects.Hami.orderRequire({
    creatorId: user.id,
    ...oldOrder,
    ...bodyJson,
  });

  await storageClient.set(order, config.orderStorage);

  return {
    ok: true,
    data: {},
  };
});
