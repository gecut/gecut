import { config, logger } from '../../lib/config';
import { nanoServer } from '../../lib/server';
import { storageClient } from '../../lib/storage';
import { tokenGenerator } from '../../lib/token';

import type { AlwatrServiceResponse } from '@alwatr/type/service-response';
import type { StringifyableRecord } from '@gecut/types';
import type {
  SignInRequest,
  SignInResponse,
  User,
} from '@gecut/types/hami/user';

nanoServer.route(
    'POST',
    '/sign-in/',
    async (
        connection
    ): Promise<AlwatrServiceResponse<SignInResponse, StringifyableRecord>> => {
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
