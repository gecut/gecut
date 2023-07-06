import '@material/web/list/list';

import { createElementByContent } from './base/base-renderer';

import type { ListContent, ListRendererReturn } from '../types/list';

export function renderList(content: Partial<ListContent>): ListRendererReturn {
  content.component = 'list';
  content.type = 'list';

  return createElementByContent('md-list', content);
}
