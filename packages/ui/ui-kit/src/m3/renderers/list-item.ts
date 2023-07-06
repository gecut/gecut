import '@material/web/list/list-item';
import '@material/web/list/list-item-link';

import { createElementByContent } from './base/base-renderer';

import type { ListItemContent, ItemRendererReturn } from '../types/list-item';

export function renderListItem(
    content: Partial<ListItemContent>
): ItemRendererReturn {
  content.component = 'list-item';
  content.type ??= 'list-item';

  return createElementByContent(`md-${content.type}`, content);
}
