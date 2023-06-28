import { rangeDates } from '#hami/controllers/range-dates';

import i18n from '@gecut/i18n';

import type { FormSelectContent } from '@gecut/form-builder';
import type { M3 } from '@gecut/ui-kit';

export function dateSelect(
  date = new Date().getTime(),
  options?: Partial<FormSelectContent>,
  dateList = rangeDates()
): FormSelectContent {
  const _date = new Date(date);
  const value = dateList
    .find((__date) => _date.getDate() === __date.getDate())
    ?.getTime()
    .toString();

  return {
    component: 'select',
    type: 'filled',
    value,
    slotList: dateList.map(
      (date): M3.Types.SelectOptionContent => ({
        component: 'select-option',
        type: 'select-option',
        value: date.getTime().toString(),
        headline: i18n.date(date.getTime(), {
          dateStyle: 'full',
        }),
      })
    ),

    ...(options ?? {}),
  };
}
