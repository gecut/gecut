import '@material/web/button/filled-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';
import '@material/web/button/tonal-button';

import type { ButtonContent } from '../types/button';
import type { MdElevatedButton } from '@material/web/button/elevated-button';
import type { MdFilledButton } from '@material/web/button/filled-button';
import type { MdOutlinedButton } from '@material/web/button/outlined-button';
import type { MdTextButton } from '@material/web/button/text-button';
import type { MdTonalButton } from '@material/web/button/tonal-button';

const buttonKeys = [
  'disabled',
  'href',
  'target',
  'trailingIcon',
  'hasIcon',
  'preventClickDefault',
] as const;

type renderButtonReturnType =
  | MdElevatedButton
  | MdFilledButton
  | MdOutlinedButton
  | MdTextButton
  | MdTonalButton;

export function renderButton(content: ButtonContent): renderButtonReturnType {
  let button = document.createElement(`md-${content.type}-button`);

  for (const key of buttonKeys) {
    const value: (typeof button)[typeof key] = content[key];

    if (value != null) {
      button[key] = value as never;
    }
  }

  if (content.customConfig != null) {
    button = content.customConfig(button);
  }

  if (content.iconSVG != null) {
    const trailingIcon = document.createElement('md-icon');

    trailingIcon.innerHTML = content.iconSVG;
    trailingIcon.slot = 'icon';

    button.appendChild(trailingIcon);
  }

  button.innerHTML = content.label;

  button.classList.add(...(content.classes ?? []));

  return button;
}
