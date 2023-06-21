import '@material/web/select/select-option';

import { createElementByContent } from './base/base-renderer';

import type {
  SelectOptionContent,
  SelectOptionRendererReturn,
} from '../types/select-option';

export function renderSelectOption(
  content: SelectOptionContent
): SelectOptionRendererReturn {
  return createElementByContent('md-select-option', content, [
    'value',
    'selected',
    'isMenuItem',
    'keepOpen',
    'headline',
    'supportingText',
    'multiLineSupportingText',
    'trailingSupportingText',
    'disabled',
    'itemTabIndex',
    'active',
    'isListItem',
  ]);
}
