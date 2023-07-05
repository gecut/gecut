import '@lit-labs/virtualizer';

import { createElementByContent } from './base/base-renderer';

import type {
  LitVirtualizerContent,
  LitVirtualizerRendererReturn,
} from '../types/virtualize';

export function renderLitVirtualizer<T>(
  content: LitVirtualizerContent<T>
): LitVirtualizerRendererReturn {
  return createElementByContent('lit-virtualizer', content);
}
