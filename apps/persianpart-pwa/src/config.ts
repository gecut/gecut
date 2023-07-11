import i18n from '@gecut/i18n';

import fa from './content/translation/fa-IR.json';

import type { LocaleFileType } from '@gecut/i18n';

i18n.register(fa as LocaleFileType);

declare global {
  interface Signals {
    readonly headline: string;
  }
  // interface Providers {}
}

const config = {
  version: '0.0.1',
};

export default config;
