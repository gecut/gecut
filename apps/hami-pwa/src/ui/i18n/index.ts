import { createLogger } from '@gecut/logger';

import fa from './fa-IR.json';

export type LanguageKeys<T extends Record<string, string>> = keyof T;

const logger = createLogger('i18n');

function init() {
  document.documentElement.lang = fa.$code;
  document.documentElement.dir = fa.$direction;
}

function message(key: LanguageKeys<typeof fa>) {
  logger.methodArgs?.('message', { key });

  const value = fa[key];

  if (value == null) {
    logger.warning(
      'message',
      'key_not_defined',
      `'${key}' not have any value`,
      key
    );
  }

  return value;
}

function getConfig() {
  return {
    code: fa.$code,
    direction: fa.$direction,
    language: fa.$language,
  };
}

function numberFormat(
  _number: number,
  options?: Intl.NumberFormatOptions
): string {
  _number = Number(_number);

  return _number.toLocaleString(getConfig().code, options);
}

function phoneNumber(phoneNumber: string): string {
  const x = [
    phoneNumber.substring(0, 4),
    phoneNumber.substring(4, 7),
    phoneNumber.substring(7, 11),
  ];

  return x.join('-');
}

function date(
  _date: number,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }
): string {
  const __date = new Date(_date);

  return __date.toLocaleString(getConfig().code, options);
}

const i18n = {
  init,
  message,
  getConfig,
  numberFormat,
  phoneNumber,
  date,
};

export default i18n;
