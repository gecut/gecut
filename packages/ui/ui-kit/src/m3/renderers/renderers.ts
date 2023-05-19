import { renderButton } from './button';
import { renderCircularProgress } from './circular-progress';
import { renderIcon } from './icon';
import { renderIconButton } from './icon-button';
import { renderListItem } from './list-item';
import { renderSnackBar } from './snack-bar';
import { renderTextField } from './text-field';

import type { AllComponentsContent } from '../types/types';

export * from './button';
export * from './circular-progress';
export * from './icon';
export * from './icon-button';
export * from './list-item';
export * from './text-field';
export * from './snack-bar';

export function renderer(content: AllComponentsContent) {
  switch (content.component) {
  case 'button':
    return renderButton(content);
  case 'icon':
    return renderIcon(content);
  case 'icon-button':
    return renderIconButton(content);
  case 'circular-progress':
    return renderCircularProgress(content);
  case 'list-item':
    return renderListItem(content);
  case 'text-field':
    return renderTextField(content);
  case 'snack-bar':
    return renderSnackBar(content);
  }
}
