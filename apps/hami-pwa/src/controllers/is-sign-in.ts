import { request } from '@gecut/signal';

import { logger } from './logger';

export async function isSignIn(): Promise<boolean> {
  logger.method?.('isSignIn');

  if (
    localStorage.getItem('USER_ID') != null &&
    localStorage.getItem('USER_TOKEN') != null
  ) {
    return await request('user', {}, 'cacheFirst')
      .then(() => true)
      .catch(() => false);
  }

  return false;
}
