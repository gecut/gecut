import i18n from '@gecut/i18n';

import type { M3 } from '@gecut/ui-kit';

export function numberHelper(target: M3.Types.TextFieldRendererReturn) {
  if (!Number.isNaN(target.valueAsNumber)) {
    target.supportingText = i18n.int(target.valueAsNumber);
  } else {
    target.supportingText = '';
  }

  return target;
}
