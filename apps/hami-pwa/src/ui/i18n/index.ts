import { createLogger } from '@gecut/logger';

import fa from './fa-IR.json';

export type LanguageKeys<T extends Record<string, string>> = keyof T;

const logger = createLogger('i18n');

function init() {
  document.documentElement.lang = fa.$code;
  document.documentElement.dir = fa.$direction;
}

function message(key: string, ...replacement: string[]) {
  logger.methodArgs?.('message', { key });

  let value = key;

  if (Object.keys(fa).includes(key) === true) {
    value = fa[key as LanguageKeys<typeof fa>];
  }

  if (value === key) {
    logger.warning(
      'message',
      'key_not_defined',
      `'${key}' not have any value`,
      key
    );
  }

  for (const str of replacement) {
    value = value.replace('{{}}', str);
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

function phoneNumber(phoneNumber: string, reverse = false): string {
  let x = [
    phoneNumber.substring(0, 4),
    phoneNumber.substring(4, 7),
    phoneNumber.substring(7, 11),
  ];

  if (reverse === true) {
    x = x.reverse();
  }

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
