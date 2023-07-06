import { logger } from '../lib/config';

import { requireSignedIn } from './require-signed-in';

import type { AlwatrConnection } from '@alwatr/nano-server';
import type { Projects } from '@gecut/types';

export const requireAdmin = async (
    connection: AlwatrConnection
): Promise<Projects.Hami.User> => {
  logger.logMethod?.('require-admin');

  const user = await requireSignedIn(connection);

  if (user.role !== 'admin') {
    // eslint-disable-next-line no-throw-literal
    throw {
      ok: false,
      statusCode: 403,
      errorCode: 'user-is-locked-for-this-operation',
    };
  }

  return user;
};
