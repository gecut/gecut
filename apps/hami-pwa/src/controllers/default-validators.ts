import i18n from '@gecut/i18n';

import type { Rules } from '@gecut/form-validator';

export const defaultValidators: Record<Rules[number]['rule'], Rules[number]> = {
  required: {
    rule: 'required',
    errorMessage: i18n.msg('text_field_error_message_rule_required'),
  },
  numeric: {
    rule: 'numeric',
    errorMessage: i18n.msg('text_field_error_message_rule_numeric'),
  },
  phone: {
    rule: 'phone',
    country: 'IR',
    errorMessage: i18n.msg('text_field_error_message_rule_phone'),
  },
  email: {
    rule: 'email',
    errorMessage: i18n.msg('text_field_error_message_rule_email'),
  },
};
