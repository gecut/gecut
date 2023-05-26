import '@material/web/list/list';

import { createElementByContent } from './base/base-renderer';

import type { ListContent, ListRendererReturn } from '../types/list';

export function renderList(content: ListContent): ListRendererReturn {
  const item = createElementByContent('md-list', content, [
    'type',
    'listTabIndex',
    'listRoot',
  ]);

  return item;
}
