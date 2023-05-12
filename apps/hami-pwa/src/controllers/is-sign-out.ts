import { isSignIn } from './is-sign-in';

export async function isSignOut(): Promise<boolean> {
  return !(await isSignIn());
}
