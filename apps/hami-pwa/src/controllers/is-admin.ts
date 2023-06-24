import { request } from '@gecut/signal';

import { isSignIn } from './is-sign-in';
import { logger } from './logger';

export async function isAdmin(): Promise<boolean> {
  const _isSignIn = (await isSignIn()) === true;

  logger.methodFull?.('ifAdmin', {}, _isSignIn);

  if ((await isSignIn()) === true) {
    return await request('user', {}, 'cacheFirst')
      .then((user) => user.role === 'admin')
      .catch(() => false);
  }

  return false;
}
