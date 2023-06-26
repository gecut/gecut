import type { MaybePromise } from '@gecut/types';

export async function when<T extends Record<string, unknown>>(
  cond: boolean,
  trueCase: () => MaybePromise<T>
): Promise<T | undefined> {
  if (cond == true) {
    return await trueCase();
  }

  return undefined;
}
