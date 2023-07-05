import { createElementByContent } from './base/base-renderer';

import type { IconContent } from '../types/icon';
import type { MdIcon } from '@material/web/icon/icon';

type renderIconReturnType = MdIcon;

export function renderIcon(
  content: Partial<IconContent>
): renderIconReturnType {
  content.component = 'icon';
  content.type = 'svg';

  const icon = createElementByContent('md-icon', content);

  if (icon.slot === 'start') {
    icon.style.setProperty(
      'margin-inline-start',
      'calc(2 * var(--sys-spacing-track, 8px))'
    );
  }

  if (content.SVG != null) {
    icon.innerHTML = content.SVG;
  }

  return icon;
}
