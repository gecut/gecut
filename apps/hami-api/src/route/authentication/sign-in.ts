import { config, logger } from '../../lib/config';
import { nanoServer } from '../../lib/server';
import { storageClient } from '../../lib/storage';
import { tokenGenerator } from '../../lib/token';

import type { Projects } from '@gecut/types';

nanoServer.route(
    'POST',
    '/sign-in/',
    async (connection): Promise<Projects.Hami.Routes['sign-in']> => {
      logger.logMethod?.('user-sign-in');

      const bodyJson = await connection.requireJsonBody<{
      data: Projects.Hami.SignInRequest;
    }>();
      const userStorage = await storageClient.getStorage<Projects.Hami.User>(
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
          errorCode: 'user-with-this-profile-was-not-found',
        };
      }

      if (user.active === false) {
        return {
          ok: false,
          statusCode: 403,
          errorCode: 'user-is-locked-for-this-operation',
        };
      }

      return {
        ok: true,
        data: { ...user, token: tokenGenerator.generate(user.id) },
      };
    }
);
