import { logger } from './logger';

type X = string | number | null | undefined;

export function isFieldExits(...values: X[]) {
  return values
      .map((value) => _isFieldExits(value))
      .reduce((p, c) => p || c, false);
}
function _isFieldExits(value: X): boolean {
  if (typeof value === 'number') {
    logger.methodFull?.('isFieldExits', { value }, true);

    return true;
  }

  value = (value ?? '').trim();

  const isEmpty = !value || value.indexOf('no') === 0;

  logger.methodFull?.('isFieldExits', { value }, !isEmpty);

  if (isEmpty === true) return false;

  return true;
}
