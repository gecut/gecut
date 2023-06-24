import i18n from '@gecut/i18n';

import type { FormSelectContent } from '@gecut/form-builder';

const dayList = [
  '22',
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
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
] as const;

export function daySelect(date = new Date().getTime()): FormSelectContent {
  const value = new Date(date).getUTCDate().toString();

  console.log(value);

  return {
    component: 'select',
    type: 'filled',
    label: i18n.msg('day'),
    value,
    name: 'day',
    styles: {
      'z-index': 'var(--sys-zindex-dropdown)',
      'min-width': '10vw',
    },
    slotList: dayList.map((day) => ({
      component: 'select-option',
      type: 'select-option',
      value: day,
      headline: i18n.date(new Date().setUTCDate(Number(day)), {
        day: 'numeric',
        weekday: 'long',
      }),
    })),
  };
}
