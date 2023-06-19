import i18n from '@gecut/i18n';
import { Projects } from '@gecut/types';

import type { FormSelectContent } from '@gecut/form-builder';

export function orderStatusSelect(
  value?: Projects.Hami.Order['status']
): FormSelectContent {
  return {
    component: 'select',
    type: 'filled',
    label: i18n.msg('content_order_card_status'),
    value,
    name: 'status',
    styles: {
      zIndex: 'var(--sys-zindex-dropdown)',
    },
    slotList: Projects.Hami.orderStatusList.map((status) => ({
      component: 'select-option',
      type: 'select-option',
      value: status,
      headline: i18n.msg(status),
    })),
  };
}
