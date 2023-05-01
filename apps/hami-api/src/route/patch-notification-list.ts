import {config, logger} from '../lib/config';
import {nanoServer} from '../lib/server';
import {storageClient} from '../lib/storage';
import {requireAdmin} from '../util/require-admin';

import type {Notification} from '@gecut/types/hami/notification';

nanoServer.route('PATCH', '/notification-list/', async (connection) => {
  logger.logMethod('patch-notification-list');

  await requireAdmin(connection);

  const bodyJson = await connection.requireJsonBody<{data: Array<Notification>}>();

  for (const notification of bodyJson.data) {
    await storageClient.set(notification, config.notificationStorage);
  }

  return {
    ok: true,
    data: {},
  };
});
