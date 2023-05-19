import '../components/snack-bar';

import { createElementByContent } from './base/base-renderer';

import type {
  SnackBarContent,
  SnackBarRendererReturn,
} from '../types/snack-bar';

export function renderSnackBar(
  content: SnackBarContent
): SnackBarRendererReturn {
  const snackBar = createElementByContent('snack-bar', content, [
    'type',
    'align',
    'message',
    'duration',
    'startFrom',
    'closeButton',
  ]);

  return snackBar;
}
