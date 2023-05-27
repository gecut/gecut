import { createElementByContent } from './base/base-renderer';

import type {
  DivisionContent,
  DivisionRendererReturn,
} from '../types/division';

export function renderDivision(
  content: DivisionContent
): DivisionRendererReturn {
  return createElementByContent(content.type, content, []);
}
