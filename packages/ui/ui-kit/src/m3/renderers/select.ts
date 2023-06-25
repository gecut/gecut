import { gecutAnimationFrame } from '@gecut/utilities';
import '@material/web/select/filled-select';
import '@material/web/select/outlined-select';

import { createElementByContent } from './base/base-renderer';

import type { SelectContent, SelectRendererReturn } from '../types/select';

export function renderSelect(content: SelectContent): SelectRendererReturn {
  const select = createElementByContent(`md-${content.type}-select`, content, [
    'quick',
    'required',
    'disabled',
    'errorText',
    'label',
    'supportingText',
    'error',
    'menuFixed',
    'typeaheadBufferTime',
    'hasLeadingIcon',
    'hasTrailingIcon',
    'displayText',
    'value',
    'selectedIndex',
  ]);

  gecutAnimationFrame(() => {
    const mdMenu = select?.renderRoot?.querySelector?.('md-menu');

    if (mdMenu != null) {
      mdMenu.style.maxHeight = '35vh';
    }
  });

  return select;
}
