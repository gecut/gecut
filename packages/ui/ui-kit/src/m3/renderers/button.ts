import '@material/web/button/elevated-button';
import '@material/web/button/filled-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';
import '@material/web/button/tonal-button';

import { createElementByContent } from './base/base-renderer';

import type { ButtonContent, ButtonRendererReturn } from '../types/button';

export function renderButton(content: ButtonContent): ButtonRendererReturn {
  const button = createElementByContent(`md-${content.type}-button`, content, [
    'disabled',
    'href',
    'target',
    'trailingIcon',
    'hasIcon',
    'preventClickDefault',
  ]);

  button.append(content.label);

  return button;
}
