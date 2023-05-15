import { renderButton } from './button';
import { renderCircularProgress } from './circular-progress';
import { renderIcon } from './icon';
import { renderIconButton } from './icon-button';
import { renderListItem } from './list-item';

import type { AllComponentsContent } from '../types/components';

export function renderComponent(component: AllComponentsContent) {
  switch (component.component) {
  case 'button':
    return renderButton(component);
  case 'icon-button':
    return renderIconButton(component);
  case 'icon':
    return renderIcon(component);
  case 'circular-progress':
    return renderCircularProgress(component);
  case 'list-item':
    return renderListItem(component);
  default:
    return undefined;
  }
}
