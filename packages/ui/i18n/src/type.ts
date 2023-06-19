export type LanguageCode = 'fa-IR';
export type LanguageName = 'فارسی';
export type LanguageDirection = 'rtl';

export interface LocaleConfig {
  $code: LanguageCode;
  $name: LanguageName;
  $dir: LanguageDirection;
}

export interface LocaleFileType extends Record<string, string> {
  $code: LanguageCode;
  $name: LanguageName;
  $dir: LanguageDirection;
}
