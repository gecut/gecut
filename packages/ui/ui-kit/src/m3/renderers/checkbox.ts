import '@material/web/checkbox/checkbox';

import { createElementByContent } from './base/base-renderer';

import type {
  CheckboxContent,
  CheckboxRendererReturn,
} from '../types/checkbox';

export function renderCheckbox(
  content: CheckboxContent
): CheckboxRendererReturn {
  return createElementByContent('md-checkbox', content, [
    'checked',
    'disabled',
    'error',
    'indeterminate',
    'value',
    'name',
  ]);
}
