import { request } from '@gecut/signal';

export async function isSignIn(): Promise<boolean> {
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
