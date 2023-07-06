import { isAdmin } from './is-admin';
import { logger } from './logger';

import type { ArrowFunction } from '@gecut/types';

export async function ifAdmin(
    trueCallback?: ArrowFunction,
    falseCallback?: ArrowFunction
): Promise<boolean> {
  const _isAdmin = await isAdmin();

  logger.methodFull?.(
      'ifAdmin',
      {
        trueCallback,
        falseCallback,
      },
      _isAdmin
  );

  if (await isAdmin()) {
    trueCallback?.();
  } else {
    falseCallback?.();
  }

  return _isAdmin;
}
