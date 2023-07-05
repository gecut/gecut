import { createElementByContent } from './base/base-renderer';

import type {
  DivisionContent,
  DivisionRendererReturn,
} from '../types/division';

export function renderDivision(
  content: Partial<DivisionContent>
): DivisionRendererReturn {
  content.component = 'division';
  content.type ??= 'div';

  return createElementByContent(content.type, content);
}
