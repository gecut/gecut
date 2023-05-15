import { notificationRequire } from '@gecut/types/hami/notification';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

import type { Notification } from '@gecut/types/hami/notification';

nanoServer.route('PATCH', '/notification-storage/', async (connection) => {
  logger.logMethod('patch-notification-storage');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{
    data: Array<Partial<Notification>>;
  }>();

  for (const notification of bodyJson.data) {
    await storageClient.set(
      notificationRequire(notification),
      config.notificationStorage
    );
  }

  return {
    ok: true,
    data: {},
  };
});
