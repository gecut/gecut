import '@material/web/dialog/dialog';

import { createElementByContent } from './base/base-renderer';

import type { DialogContent, DialogRendererReturn } from '../types/dialog';

export function renderDialog(content: DialogContent): DialogRendererReturn {
  content.transition ??= 'grow';

  const dialog = createElementByContent('md-dialog', content, [
    'open',
    'fullscreen',
    'fullscreenBreakpoint',
    'footerHidden',
    'stacked',
    'defaultAction',
    'actionAttribute',
    'focusAttribute',
    'scrimClickAction',
    'escapeKeyAction',
    'modeless',
    'draggable',
    'transition',
  ]);

  return dialog;
}
