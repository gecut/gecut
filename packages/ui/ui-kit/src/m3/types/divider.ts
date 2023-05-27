import type { BaseContent } from './base/base-content';
import type { MdDivider } from '@material/web/divider/divider';

export type DividerRendererReturn = MdDivider;

export interface DividerContent extends BaseContent<DividerRendererReturn> {
  component: 'divider';
  type: 'divider';

  /**
   * Indents the divider with equal padding on both sides.
   */
  inset?: boolean;
  /**
   * Indents the divider with padding on the leading side.
   */
  insetStart?: boolean;
  /**
   * Indents the divider with padding on the trailing side.
   */
  insetEnd?: boolean;
}
