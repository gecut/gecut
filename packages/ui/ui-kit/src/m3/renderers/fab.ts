import '@material/web/fab/fab';

import { createElementByContent } from './base/base-renderer';

import type { FABContent, FABRendererReturn } from '../types/fab';

export function renderFAB(content: FABContent): FABRendererReturn {
  const fab = createElementByContent('md-fab', content, [
    'variant',
    'size',
    'label',
    'lowered',
    'reducedTouchTarget',
  ]);

  return fab;
}
