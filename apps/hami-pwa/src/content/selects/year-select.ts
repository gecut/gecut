import i18n from '@gecut/i18n';

import type { FormSelectContent } from '@gecut/form-builder';

const yearList = ['2023'] as const;

export function yearSelect(date = new Date().getTime()): FormSelectContent {
  const value = new Date(date).getUTCFullYear().toString();

  console.log(value);

  return {
    component: 'select',
    type: 'filled',
    label: i18n.msg('year'),
    value,
    name: 'year',
    styles: {
      'z-index': 'var(--sys-zindex-dropdown)',
      'min-width': '10vw',
    },
    slotList: yearList.map((year) => ({
      component: 'select-option',
      type: 'select-option',
      value: year,
      headline: i18n.date(new Date().setUTCFullYear(Number(year)), {
        year: 'numeric',
      }),
    })),
  };
}
