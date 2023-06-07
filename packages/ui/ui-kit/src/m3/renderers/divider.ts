import '@material/web/divider/divider';

import { createElementByContent } from './base/base-renderer';

import type { DividerContent, DividerRendererReturn } from '../types/divider';

export function renderDivider(content: DividerContent): DividerRendererReturn {
  return createElementByContent('md-divider', content, [
    'insetStart',
    'inset',
    'insetEnd',
  ]);
}
