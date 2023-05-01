import {config, logger} from '../lib/config';
import {nanoServer} from '../lib/server';
import {storageClient} from '../lib/storage';
import {requireSignedIn} from '../util/require-signed-in';

import type {Notification} from '@gecut/types/hami/notification';

nanoServer.route('GET', '/notification-list/', async (connection) => {
  logger.logMethod('get-notification-list');

  await requireSignedIn(connection);

  return await storageClient.getStorage<Notification>(config.notificationStorage);
});
