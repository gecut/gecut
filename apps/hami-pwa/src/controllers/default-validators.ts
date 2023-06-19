import i18n from '@gecut/i18n';

import type { Rules } from '@gecut/form-validator';

export const defaultValidators: Record<Rules[number]['rule'], Rules[number]> = {
  required: {
    rule: 'required',
    errorMessage: i18n.msg('it-is-required'),
  },
  numeric: {
    rule: 'numeric',
    errorMessage: i18n.msg('must-be-numeric'),
  },
  phone: {
    rule: 'phone',
    country: 'IR',
    errorMessage: i18n.msg('phone-number-is-invalid'),
  },
  email: {
    rule: 'email',
    errorMessage: i18n.msg('email-is-invalid'),
  },
};
