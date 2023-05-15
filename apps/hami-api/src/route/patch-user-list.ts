import { Projects } from '@gecut/types';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';

nanoServer.route('PATCH', '/user-list/', async (connection) => {
  logger.logMethod('patch-user-list');

  connection.requireToken(config.nanoServer.adminToken);

  const bodyJson = await connection.requireJsonBody<{
    data: Array<Partial<Projects.Hami.User>>;
  }>();

  for (const user of bodyJson.data) {
    await storageClient.set(
      Projects.Hami.userRequire(user),
      config.userStorage
    );
  }

  return {
    ok: true,
    data: {},
  };
});
