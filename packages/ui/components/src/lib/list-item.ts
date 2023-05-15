import '@material/web/list/list-item';
import '@material/web/list/list-item-link';

import { renderComponent } from './render';

import type { ListItemContent } from '../types/list-item';
import type { MdListItem } from '@material/web/list/list-item';
import type { MdListItemLink } from '@material/web/list/list-item-link';

const itemKeys = [
  'headline',
  'supportingText',
  'multiLineSupportingText',
  'trailingSupportingText',
  'disabled',
  'active',
] as const;

type renderListItemReturnType = MdListItem | MdListItemLink;

export function renderListItem(
  content: ListItemContent
): renderListItemReturnType {
  const slotList = (content.slotList ?? []).map((slot) =>
    renderComponent(slot)
  );

  let item = document.createElement(`md-${content.type}`);

  for (const key of itemKeys) {
    const value = content[key];

    if (value != null) {
      item[key] = value as never;
    }
  }

  for (const slot of slotList) {
    if (slot != null) {
      item.appendChild(slot);
    }
  }

  if (content.customConfig != null) {
    item = content.customConfig(item);
  }

  item.classList.add(...(content.classes ?? []));

  return item;
}
