import { createElementByContent } from './base/base-renderer';

import type { IMGContent, IMGRendererReturn } from '../types/img';

export function renderIMG(content: Partial<IMGContent>): IMGRendererReturn {
  content.component = 'img';
  content.type = 'img';

  return createElementByContent('img', content);
}
