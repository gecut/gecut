import i18n from '@gecut/i18n';

import { logger } from './logger';

export function getByErrorCode(errorCode = ''): string {
  if (errorCode.trim() === '') {
    return i18n.msg('error-communicating-with-the-server');
  }

  const error = i18n.msg(errorCode);

  logger.methodArgs?.('getByErrorCode', { errorCode, error });

  if (error === 'key_not_defined') {
    return i18n.msg('error-communicating-with-the-server');
  }

  return error;
}
