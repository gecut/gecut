import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireSignedIn } from '../util/require-signed-in';

import type { Projects } from '@gecut/types';

nanoServer.route(
    'GET',
    '/notification-storage/',
    async (connection): Promise<Projects.Hami.Routes['notification-storage']> => {
      logger.logMethod?.('get-notification-storage');

      await requireSignedIn(connection);

      return await storageClient.getStorage<Projects.Hami.Notification>(
          config.notificationStorage
      );
    }
);
