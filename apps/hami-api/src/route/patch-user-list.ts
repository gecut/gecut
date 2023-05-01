import {userRequire} from '@gecut/types/hami/user';

import {config, logger} from '../lib/config';
import {nanoServer} from '../lib/server';
import {storageClient} from '../lib/storage';

import type {User} from '@gecut/types/hami/user';

nanoServer.route('PATCH', '/user-list/', async (connection) => {
  logger.logMethod('patch-user-list');

  connection.requireToken(config.nanoServer.adminToken);

  const bodyJson = await connection.requireJsonBody<{data: Array<Partial<User>>}>();

  for (const user of bodyJson.data) {
    await storageClient.set(userRequire(user), config.userStorage);
  }

  return {
    ok: true,
    data: {},
  };
});
