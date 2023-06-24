import i18n from '@gecut/i18n';

import type { FormSelectContent } from '@gecut/form-builder';

const monthList = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
] as const;

export function monthSelect(date = new Date().getTime()): FormSelectContent {
  const value = new Date(date).getUTCMonth().toString();

  console.log(value);

  return {
    component: 'select',
    type: 'filled',
    label: i18n.msg('month'),
    value,
    name: 'month',
    styles: {
      'z-index': 'var(--sys-zindex-dropdown)',
      'min-width': '10vw',
    },
    slotList: monthList.map((month) => ({
      component: 'select-option',
      type: 'select-option',
      value: month,
      headline: i18n.date(new Date().setUTCMonth(Number(month)), {
        month: 'long',
      }),
    })),
  };
}
