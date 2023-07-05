import '@material/web/divider/divider';

import { createElementByContent } from './base/base-renderer';

import type { DividerContent, DividerRendererReturn } from '../types/divider';

export function renderDivider(content: Partial<DividerContent>): DividerRendererReturn {
  content.component = 'divider';
  content.type = 'divider';

  return createElementByContent('md-divider', content);
}
