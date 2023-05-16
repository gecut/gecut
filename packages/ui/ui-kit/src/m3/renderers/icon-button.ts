import '@material/web/iconbutton/filled-icon-button';
import '@material/web/iconbutton/filled-tonal-icon-button';
import '@material/web/iconbutton/outlined-icon-button';
import '@material/web/iconbutton/standard-icon-button';

import type { IconButtonContent } from '../types/icon-button';
import type { MdFilledIconButton } from '@material/web/iconbutton/filled-icon-button';
import type { MdFilledTonalIconButton } from '@material/web/iconbutton/filled-tonal-icon-button';
import type { MdOutlinedIconButton } from '@material/web/iconbutton/outlined-icon-button';
import type { MdStandardIconButton } from '@material/web/iconbutton/standard-icon-button';

type renderButtonReturnType =
  | MdStandardIconButton
  | MdFilledIconButton
  | MdFilledTonalIconButton
  | MdOutlinedIconButton;

const iconButtonKeys = [
  'slot',
  'disabled',
  'flipIconInRtl',
  'href',
  'target',
  'selectedAriaLabel',
  'toggle',
  'selected',
] as const;

export function renderIconButton(
  content: IconButtonContent
): renderButtonReturnType {
  let iconButton = document.createElement(`md-${content.type}-icon-button`);

  for (const key of iconButtonKeys) {
    const value = content[key];

    if (value != null) {
      iconButton[key] = value as never;
    }
  }

  if (content.customConfig != null) {
    iconButton = content.customConfig(iconButton);
  }

  if (content.icon != null) {
    iconButton.innerHTML = content.icon.SVG;
  }

  iconButton.classList.add(...(content.classes ?? []));

  return iconButton;
}
