import i18n from '@gecut/i18n';

import { logger } from './logger';

import type { Rules } from '@gecut/form-validator';

export const validators = (...rules: Rules[number]['rule'][]): Rules => {
  logger.methodArgs?.('validators', {
    rules,
  });

  return rules.map((rule) => validator(rule));
};

const validator = (rule: Rules[number]['rule']): Rules[number] => {
  switch (rule) {
    case 'phone':
      return {
        rule: 'phone',
        country: 'IR',
        errorMessage: i18n.msg('phone-number-is-invalid'),
      };
    case 'email':
      return {
        rule: 'email',
        errorMessage: i18n.msg('email-is-invalid'),
      };
    case 'numeric':
      return {
        rule: 'numeric',
        errorMessage: i18n.msg('must-be-numeric'),
      };
    case 'required':
      return {
        rule: 'required',
        errorMessage: i18n.msg('it-is-required'),
      };
  }
};
