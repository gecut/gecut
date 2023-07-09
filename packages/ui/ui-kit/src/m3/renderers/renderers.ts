import { renderLitVirtualizer } from '../../lit/renderers/virtualize';

import { renderButton } from './button';
import { renderCheckbox } from './checkbox';
import { renderCircularProgress } from './circular-progress';
import { renderDialog } from './dialog';
import { renderDivider } from './divider';
import { renderDivision } from './division';
import { renderFAB } from './fab';
import { renderFormBuilder } from './form-builder';
import { renderIcon } from './icon';
import { renderIconButton } from './icon-button';
import { renderIMG } from './img';
import { renderList } from './list';
import { renderListItem } from './list-item';
import { renderRadio } from './radio';
import { renderSelect } from './select';
import { renderSelectOption } from './select-option';
import { renderSnackBar } from './snack-bar';
import { renderSurfaceCard } from './surface-card';
import { renderTextField } from './text-field';
import { renderTopAppBar } from './top-app-bar';
import { renderTypoGraphy } from './typography';

import type { AllComponentsContent } from '../types/types';

export * from './button';
export * from './checkbox';
export * from './circular-progress';
export * from './dialog';
export * from './divider';
export * from './division';
export * from './fab';
export * from './form-builder';
export * from './icon-button';
export * from './icon';
export * from './img';
export * from './list-item';
export * from './list';
export * from './radio';
export * from './select-option';
export * from './select';
export * from './snack-bar';
export * from './surface-card';
export * from './text-field';
export * from './typography';
export * from './top-app-bar';

export function renderer<T>(content: AllComponentsContent<T>) {
  switch (content.component) {
    case 'button':
      return renderButton(content);
    case 'circular-progress':
      return renderCircularProgress(content);
    case 'checkbox':
      return renderCheckbox(content);
    case 'img':
      return renderIMG(content);
    case 'typography':
      return renderTypoGraphy(content);
    case 'dialog':
      return renderDialog(content);
    case 'divider':
      return renderDivider(content);
    case 'division':
      return renderDivision(content);
    case 'fab':
      return renderFAB(content);
    case 'icon-button':
      return renderIconButton(content);
    case 'icon':
      return renderIcon(content);
    case 'form-builder':
      return renderFormBuilder(content);
    case 'list-item':
      return renderListItem(content);
    case 'list':
      return renderList(content);
    case 'snack-bar':
      return renderSnackBar(content);
    case 'surface-card':
      return renderSurfaceCard(content);
    case 'select':
      return renderSelect(content);
    case 'select-option':
      return renderSelectOption(content);
    case 'radio':
      return renderRadio(content);
    case 'text-field':
      return renderTextField(content);
    case 'top-app-bar':
      return renderTopAppBar(content);
    case 'lit-virtualizer':
      return renderLitVirtualizer(content);
  }
}
