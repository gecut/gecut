import '@material/web/radio/radio';

import { createElementByContent } from './base/base-renderer';

import type {
  RadioContent,
  RadioRendererReturn,
} from '../types/radio';

export function renderRadio(
  content: RadioContent
): RadioRendererReturn {
  return createElementByContent('md-radio', content, [
    'checked',
    'disabled',
    'value',
    'name',
  ]);
}
