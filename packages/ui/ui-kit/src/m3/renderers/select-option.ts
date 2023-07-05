import '@material/web/select/select-option';

import { createElementByContent } from './base/base-renderer';

import type {
  SelectOptionContent,
  SelectOptionRendererReturn,
} from '../types/select-option';

export function renderSelectOption(
  content: Partial<SelectOptionContent>
): SelectOptionRendererReturn {
  content.component = 'select-option';
  content.type = 'select-option';

  return createElementByContent('md-select-option', content);
}
