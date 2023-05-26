import { routerGo } from '#hami/ui/router';

import { isSignIn } from './is-sign-in';

export async function requireSignIn(options: {
  tryUrl?: string;
  catchUrl?: string;
}): Promise<boolean> {
  const _isSignIn = await isSignIn();

  if (_isSignIn === true && options.tryUrl != null) {
    routerGo(options.tryUrl);
  }

  if (_isSignIn === false && options.catchUrl != null) {
    routerGo(options.catchUrl);
  }

  return _isSignIn;
}
