import { logger } from './logger';

export function isFieldExits(value: string) {
  value = value.trim();

  const isExists = !(value === '' || value.indexOf('no') === 0);

  logger.methodFull?.('isFieldExits', { value }, isExists);

  if (isExists === true) return false;

  return true;
}
