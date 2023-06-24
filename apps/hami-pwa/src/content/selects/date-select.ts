import i18n from '@gecut/i18n';

import type { FormSelectContent } from '@gecut/form-builder';
import type { M3 } from '@gecut/ui-kit';

const getDatesBetween = (
  startDate: Date,
  endDate: Date,
  includeEndDate?: boolean
) => {
  const dates = [];
  const currentDate = startDate;
  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (includeEndDate) dates.push(endDate);
  return dates;
};

const now = new Date().setDate(0);
const now1 = new Date().setDate(30);
const dateList = getDatesBetween(new Date(now), new Date(now1), true);

export function dateSelect(
  date = new Date().getTime(),
  name: string,
  title: string,
  index = 0
): FormSelectContent {
  const value = new Date(date).getTime().toString();

  return {
    component: 'select',
    type: 'filled',
    label: title,
    value,
    name,
    styles: {
      'z-index': index == 0 ? 'var(--sys-zindex-dropdown)' : '1000',
      'min-width': '10vw',
    },
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
  };
}
