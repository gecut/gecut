import { Projects } from '@gecut/types';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

nanoServer.route('PATCH', '/notification-storage/', async (connection) => {
  logger.logMethod('patch-notification-storage');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{
    data: Array<Partial<Projects.Hami.Notification>>;
  }>();

  for (const notification of bodyJson.data) {
    await storageClient.set(
      Projects.Hami.notificationRequire(notification),
      config.notificationStorage
    );
  }

  return {
    ok: true,
    data: {},
  };
});
