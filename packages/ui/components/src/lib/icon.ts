import type { IconContent } from '../types/icon';
import type { MdIcon } from '@material/web/icon/icon';

type renderIconReturnType = MdIcon;

const iconKeys = ['slot'] as const;

export function renderIcon(content: IconContent): renderIconReturnType {
  let icon = document.createElement('md-icon');

  for (const key of iconKeys) {
    const value = content[key];

    if (value != null) {
      icon[key] = value as never;
    }
  }

  icon.innerHTML = content.SVG;

  if (content.customConfig != null) {
    icon = content.customConfig(icon);
  }

  icon.classList.add(...(content.classes ?? []));

  return icon;
}
