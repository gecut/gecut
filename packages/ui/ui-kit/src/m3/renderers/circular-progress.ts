import '@material/web/circularprogress/circular-progress';

import { createElementByContent } from './base/base-renderer';

import type {
  CircularProgressContent,
  CircularProgressRendererReturn,
} from '../types/circular-progress';

export function renderCircularProgress(
  content: CircularProgressContent
): CircularProgressRendererReturn {
  const progress = createElementByContent(`md-${content.type}`, content, [
    'progress',
    'indeterminate',
    'fourColor',
  ]);

  return progress;
}
