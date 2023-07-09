import '../components/top-app-bar';

import { createElementByContent } from './base/base-renderer';

import type {
  TopAppBarContent,
  TopAppBarRendererReturn,
} from '../types/top-app-bar';

export function renderTopAppBar(
    content: Partial<TopAppBarContent>
): TopAppBarRendererReturn {
  content.component = 'top-app-bar';
  content.type ??= 'small';

  const element = createElementByContent('top-app-bar', content);

  element.type = content.type;

  return element;
}
