import { routerGo } from '#hami/ui/router';

import { isSignIn } from './is-sign-in';
import { logger } from './logger';

export async function requireSignIn(options: {
  tryUrl?: string;
  catchUrl?: string;
}): Promise<boolean> {
  const _isSignIn = await isSignIn();

  logger.methodFull?.(
      'requireSignIn',
      { tryUrl: options.tryUrl, catchUrl: options.catchUrl },
      _isSignIn
  );

  if (_isSignIn === true && options.tryUrl != null) {
    routerGo(options.tryUrl);
  }

  if (_isSignIn === false && options.catchUrl != null) {
    routerGo(options.catchUrl);
  }

  return _isSignIn;
}
