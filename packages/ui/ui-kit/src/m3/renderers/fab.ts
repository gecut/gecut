import '@material/web/fab/fab';

import { createElementByContent } from './base/base-renderer';

import type { FABContent, FABRendererReturn } from '../types/fab';

export function renderFAB(content: Partial<FABContent>): FABRendererReturn {
  content.component = 'fab';
  content.type = 'fab';

  return createElementByContent('md-fab', content);
}
