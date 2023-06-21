import { config, logger } from '../lib/config';
import { storageClient } from '../lib/storage';
import { tokenGenerator } from '../lib/token';

import type { AlwatrConnection } from '@alwatr/nano-server';
import type { Projects } from '@gecut/types';

/**
 * This function requires a signed-in user by verifying their token and retrieving their information
 * from storage.
 * @param {AlwatrConnection} connection - AlwatrConnection object, which is used to handle the
 * connection between the client and server.
 * @returns A Promise that resolves to a User object.
 */
export const requireSignedIn = async (
  connection: AlwatrConnection
): Promise<Projects.Hami.User> => {
  logger.logMethod?.('require-signed-in');

  const params = connection.requireQueryParams<{ uid: string }>({
    uid: 'string',
  });

  connection.requireToken(
    (token) => tokenGenerator.verify(params.uid, token) === 'valid'
  );

  const user = await storageClient
    .get<Projects.Hami.User>(params.uid, config.userStorage)
    .catch(() => null);

  if (user == null) {
    // eslint-disable-next-line no-throw-literal
    throw {
      ok: false,
      statusCode: 404,
      errorCode: 'user-with-this-profile-was-not-found',
    };
  }

  return user;
};
