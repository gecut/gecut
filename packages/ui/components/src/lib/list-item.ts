import { html } from 'lit';
import { map } from 'lit/directives/map.js';

import '@material/web/list/list-item';
import '@material/web/list/list-item-link';

import { renderComponent } from './render';

import type { ListItemContent } from '../types/list-item';
import type { TemplateResult } from 'lit';

export function renderListItem(content: ListItemContent): TemplateResult {
  const slotList = map(content.slotList ?? [], (slot) => renderComponent(slot));

  switch (content.type) {
    case 'listItem':
      return html`
        <md-list-item
          .headline=${content.headline}
          .itemTabIndex=${content.itemTabIndex}
          .supportingText=${content.supportingText}
          .trailingSupportingText=${content.trailingSupportingText}
          ?active=${content.active}
          ?disabled=${content.disabled}
          ?multiLineSupportingText=${content.multiLineSupportingText}
        >
          ${slotList}
        </md-list-item>
      `;
    case 'listItemLink':
      return html`
        <md-list-item
          .headline=${content.headline}
          .itemTabIndex=${content.itemTabIndex}
          .supportingText=${content.supportingText}
          .trailingSupportingText=${content.trailingSupportingText}
          .href=${content.href}
          .target=${content.target}
          ?active=${content.active}
          ?disabled=${content.disabled}
          ?multiLineSupportingText=${content.multiLineSupportingText}
        >
          ${slotList}
        </md-list-item>
      `;
  }
}
