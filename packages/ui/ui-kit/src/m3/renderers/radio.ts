import '@material/web/radio/radio';

import { createElementByContent } from './base/base-renderer';

import type { RadioContent, RadioRendererReturn } from '../types/radio';

export function renderRadio(
    content: Partial<RadioContent>
): RadioRendererReturn {
  content.component = 'radio';
  content.type = 'radio';

  return createElementByContent('md-radio', content);
}
