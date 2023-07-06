import '@material/web/dialog/dialog';

import { createElementByContent } from './base/base-renderer';

import type { DialogContent, DialogRendererReturn } from '../types/dialog';

export function renderDialog(
  content: Partial<DialogContent>
): DialogRendererReturn {
  content.component = 'dialog';
  content.type = 'dialog';
  content.attributes ??= {};
  content.attributes.transition ??= 'grow';

  return createElementByContent('md-dialog', content);
}
