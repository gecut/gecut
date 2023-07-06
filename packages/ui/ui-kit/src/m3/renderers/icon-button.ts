import '@material/web/iconbutton/filled-icon-button';
import '@material/web/iconbutton/filled-tonal-icon-button';
import '@material/web/iconbutton/outlined-icon-button';
import '@material/web/iconbutton/standard-icon-button';

import { createElementByContent } from './base/base-renderer';

import type {
  IconButtonContent,
  IconButtonRendererReturn,
} from '../types/icon-button';

export function renderIconButton(
  content: Partial<IconButtonContent>
): IconButtonRendererReturn {
  content.component = 'icon-button';
  content.type ??= 'standard';

  const iconButton = createElementByContent(
    `md-${content.type}-icon-button`,
    content
  );

  if (content.iconSVG != null) {
    iconButton.innerHTML = content.iconSVG;
  }

  return iconButton;
}
