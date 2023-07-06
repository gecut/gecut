import '@material/web/checkbox/checkbox';

import { createElementByContent } from './base/base-renderer';

import type {
  CheckboxContent,
  CheckboxRendererReturn,
} from '../types/checkbox';

export function renderCheckbox(
  content: Partial<CheckboxContent>
): CheckboxRendererReturn {
  content.component = 'checkbox';
  content.type = 'checkbox';

  return createElementByContent('md-checkbox', content);
}
