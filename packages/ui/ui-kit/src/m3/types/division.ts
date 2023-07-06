import type { BaseContent } from './base/base-content';

export type DivisionRendererReturn = HTMLDivElement | HTMLSpanElement;

export interface DivisionContent
  extends BaseContent<DivisionRendererReturn> {
  component: 'division';
  type: 'div' | 'span';
}
