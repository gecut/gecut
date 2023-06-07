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

function numberFormat(phoneNumber: string): string {
  const x = [
    phoneNumber.substring(0, 4),
    phoneNumber.substring(4, 7),
    phoneNumber.substring(7, 11),
  ];

  return x.join('-');
}

const i18n = {
  init,
  message,
  getConfig,
  numberFormat,
};

export default i18n;
