import { renderButton } from './button';
import { renderCircularProgress } from './circular-progress';
import { renderDialog } from './dialog';
import { renderIcon } from './icon';
import { renderIconButton } from './icon-button';
import { renderList } from './list';
import { renderListItem } from './list-item';
import { renderSnackBar } from './snack-bar';
import { renderSurfaceCard } from './surface-card';
import { renderTextField } from './text-field';

import type { AllComponentsContent } from '../types/types';

export * from './button';
export * from './circular-progress';
export * from './icon';
export * from './icon-button';
export * from './list';
export * from './list-item';
export * from './text-field';
export * from './snack-bar';
export * from './dialog';

export function renderer(content: AllComponentsContent) {
  switch (content.component) {
  case 'button':
    return renderButton(content);
  case 'circular-progress':
    return renderCircularProgress(content);
  case 'dialog':
    return renderDialog(content);
  case 'icon-button':
    return renderIconButton(content);
  case 'icon':
    return renderIcon(content);
  case 'list-item':
    return renderListItem(content);
  case 'list':
    return renderList(content);
  case 'snack-bar':
    return renderSnackBar(content);
  case 'surface-card':
    return renderSurfaceCard(content);
  case 'text-field':
    return renderTextField(content);
  }
}
