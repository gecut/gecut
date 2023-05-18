import '@material/web/list/list-item';
import '@material/web/list/list-item-link';

import { createElementByContent } from './base/base-renderer';

import type { ListItemContent, ItemRendererReturn } from '../types/list-item';

export function renderListItem(content: ListItemContent): ItemRendererReturn {
  const item = createElementByContent(`md-${content.type}`, content, [
    'headline',
    'supportingText',
    'multiLineSupportingText',
    'trailingSupportingText',
    'disabled',
    'active',
  ]);

  return item;
}
