import { renderButton } from './button';
import { renderIconButton } from './icon-button';
import { renderProgress } from './progress';
import { renderIcon } from './icon';

import type { RenderResult } from '@gecut/types';
import type { AllComponentsContent } from '../types/components';

export function renderComponent(component: AllComponentsContent): RenderResult {
  switch (component.component) {
    case 'button':
      return renderButton(component);
    case 'iconButton':
      return renderIconButton(component);
    case 'icon':
      return renderIcon(component);
    case 'progress':
      return renderProgress(component);
  }
}
