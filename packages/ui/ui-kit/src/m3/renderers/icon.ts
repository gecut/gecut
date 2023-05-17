import { createElementByContent } from './base/base-renderer';

import type { IconContent } from '../types/icon';
import type { MdIcon } from '@material/web/icon/icon';

type renderIconReturnType = MdIcon;

export function renderIcon(content: IconContent): renderIconReturnType {
  const icon = createElementByContent('md-icon', content, []);

  icon.innerHTML = content.SVG;

  return icon;
}
