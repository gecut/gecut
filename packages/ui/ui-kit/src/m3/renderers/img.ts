import { createElementByContent } from './base/base-renderer';

import type { IMGContent, IMGRendererReturn } from '../types/img';

export function renderIMG(content: IMGContent): IMGRendererReturn {
  return createElementByContent('img', content, ['src', 'alt']);
}
