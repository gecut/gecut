import { createLogger } from '@gecut/logger';

import type { LanguageCode, LocaleConfig, LocaleFileType } from './type';

export type * from './type';

const logger = createLogger('gecut/i18n');
const _translations: Record<LanguageCode, Partial<LocaleFileType>> = {
  'fa-IR': {},
};
let _activeLang: LanguageCode = 'fa-IR';

export function register(content: LocaleFileType): void {
  logger.methodArgs?.('register', { content });

  _translations[content.$code] = content;
}

export function set(code: LanguageCode) {
  logger.methodArgs?.('set', { code });

  _activeLang = code;

  document.documentElement.lang = _activeLang;
  const dir = _translations[_activeLang].$dir;

  if (dir != null) {
    document.documentElement.dir = dir;
  }
}

export function msg(key: string, ...replacement: string[]): string {
  logger.methodArgs?.('msg', { key });

  let _msg = _translations[_activeLang][key];

  if (_msg != null) {
    for (const str of replacement) {
      _msg = _msg.replace('{{}}', str);
    }

    return _msg;
  }

  logger.warning(
    'msg',
    'key_not_defined',
    `'${key}' not have any value in '${_activeLang}' language`,
    key
  );

  return key;
}

export function config(): LocaleConfig {
  const config = _translations[_activeLang];

  if (config.$code == null || config.$dir == null || config.$name == null) {
    throw logger.error(
      'activeConfiguration',
      'active_language_not_have_translations'
    );
  }

  return {
    $code: config.$code,
    $dir: config.$dir,
    $name: config.$name,
  };
}

export function int(
  integer: number,
  options?: Intl.NumberFormatOptions
): string {
  integer = Number(integer);

  if (Number.isNaN(integer)) {
    logger.error('int', 'input_is_NaN', integer);
  }

  return integer.toLocaleString(_activeLang, options);
}

export function phone(phoneNumber: string, reverse = false): string {
  let phoneNumberArray = [
    phoneNumber.substring(0, 4),
    phoneNumber.substring(4, 7),
    phoneNumber.substring(7, 11),
  ];

  if (reverse === true) {
    phoneNumberArray = phoneNumberArray.reverse();
  }

  return phoneNumberArray.join('-');
}

export function date(
  timestamp: number,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }
): string {
  const date = new Date(timestamp);

  return date.toLocaleString(_activeLang, options);
}

const i18n = {
  register,
  set,
  msg,
  config,
  int,
  phone,
  date,
};

export default i18n;
