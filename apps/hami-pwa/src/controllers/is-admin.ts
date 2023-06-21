import { request } from '@gecut/signal';

import { isSignIn } from './is-sign-in';

export async function isAdmin(): Promise<boolean> {
  if (await isSignIn() === true) {
    return await request('user', {}, 'cacheFirst')
      .then((user) => user.role === 'admin')
      .catch(() => false);
  }

  return false;
}
