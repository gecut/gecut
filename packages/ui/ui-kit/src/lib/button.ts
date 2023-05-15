import '@material/web/button/elevated-button';
import '@material/web/button/filled-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';
import '@material/web/button/tonal-button';

import { renderIcon } from './icon';

import type { ButtonContent } from '../types/button';
import type { MdElevatedButton } from '@material/web/button/elevated-button';
import type { MdFilledButton } from '@material/web/button/filled-button';
import type { MdOutlinedButton } from '@material/web/button/outlined-button';
import type { MdTextButton } from '@material/web/button/text-button';
import type { MdTonalButton } from '@material/web/button/tonal-button';

type renderButtonReturnType =
  | MdElevatedButton
  | MdFilledButton
  | MdOutlinedButton
  | MdTextButton
  | MdTonalButton;

const buttonKeys = [
  'disabled',
  'href',
  'target',
  'trailingIcon',
  'hasIcon',
  'preventClickDefault',
  'slot',
] as const;

export function renderButton(content: ButtonContent): renderButtonReturnType {
  let button = document.createElement(`md-${content.type}-button`);

  for (const key of buttonKeys) {
    const value = content[key];

    if (value != null) {
      button[key] = value as never;
    }
  }

  button.innerHTML = content.label;

  if (content.customConfig != null) {
    button = content.customConfig(button);
  }

  if (content.icon != null) {
    button.appendChild(renderIcon(content.icon));
  }

  button.classList.add(...(content.classes ?? []));

  return button;
}
