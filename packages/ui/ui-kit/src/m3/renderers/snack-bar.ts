import '../components/snack-bar';

import { createElementByContent } from './base/base-renderer';

import type {
  SnackBarContent,
  SnackBarRendererReturn,
} from '../types/snack-bar';

export function renderSnackBar(
    content: Partial<SnackBarContent>
): SnackBarRendererReturn {
  content.component = 'snack-bar';
  content.type ??= 'ellipsis-message';

  return createElementByContent('snack-bar', content);
}
