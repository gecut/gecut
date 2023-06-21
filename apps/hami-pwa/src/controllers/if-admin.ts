import { isAdmin } from './is-admin';

import type { ArrowFunction } from '@gecut/types';

export async function ifAdmin(
  trueCallback?: ArrowFunction,
  falseCallback?: ArrowFunction
): Promise<void> {
  if (await isAdmin()) {
    trueCallback?.();
  } else {
    falseCallback?.();
  }
}
