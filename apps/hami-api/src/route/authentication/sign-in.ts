import { config, logger } from '../../lib/config';
import { nanoServer } from '../../lib/server';
import { storageClient } from '../../lib/storage';
import { tokenGenerator } from '../../lib/token';

import type { Routes } from '@gecut/types/hami/routes';
import type { SignInRequest, User } from '@gecut/types/hami/user';

nanoServer.route(
  'POST',
  '/sign-in/',
  async (connection): Promise<Routes['sign-in']> => {
    logger.logMethod('user-sign-in');

    const bodyJson = await connection.requireJsonBody<{
      data: SignInRequest;
    }>();
    const userStorage = await storageClient.getStorage<User>(
      config.userStorage
    );

    const user = Object.values(userStorage.data).find(
      (user) =>
        user.phoneNumber === bodyJson.data.phoneNumber &&
        user.password === bodyJson.data.password
    );

    if (user == null) {
      return {
        ok: false,
        statusCode: 404,
        errorCode: 'user_not_found',
      };
    }

    if (user.active === false) {
      return {
        ok: false,
        statusCode: 403,
        errorCode: 'user_forbidden',
      };
    }

    return {
      ok: true,
      data: { ...user, token: tokenGenerator.generate(user.id) },
    };
  }
);
