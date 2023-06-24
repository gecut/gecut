import { isSignIn } from './is-sign-in';
import { logger } from './logger';

export async function isSignOut(): Promise<boolean> {
  logger.method?.('isSignOut');

  return !(await isSignIn());
}
