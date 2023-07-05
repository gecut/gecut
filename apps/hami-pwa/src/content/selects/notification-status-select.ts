import i18n from '@gecut/i18n';
import { Projects } from '@gecut/types';

import type { FormSelectContent } from '@gecut/form-builder';

export function notificationStatusSelect(
  value: Projects.Hami.Notification['status'] = 'normal'
): FormSelectContent {
  return {
    component: 'select',
    type: 'filled',
    attributes: {
      label: i18n.msg('status'),
      value,
      name: 'status',
      styles: {
        'z-index': 'var(--sys-zindex-dropdown)',
      },
    },
    children: Projects.Hami.notificationStatusList.map((status) => ({
      component: 'select-option',
      type: 'select-option',
      value: status,
      headline: i18n.msg(status),
    })),
  };
}
