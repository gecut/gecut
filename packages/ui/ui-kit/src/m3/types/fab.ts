import type { BaseContent } from './base/base-content';
import type { MdFab, Variant, FabSize } from '@material/web/fab/fab';

export type FABRendererReturn = MdFab;

export interface FABContent extends BaseContent<FABRendererReturn, 'icon'> {
  component: 'fab';
  type: 'fab';
  /**
   * The FAB color variant to render.
   */
  variant: Variant;
  /**
   * The size of the FAB.
   *
   * NOTE: Branded FABs cannot be sized to `small`, and Extended FABs do not
   * have different sizes.
   */
  size: FabSize;
  /**
   * The text to display on the FAB.
   */
  label?: string;
  /**
   * Lowers the FAB's elevation.
   */
  lowered?: boolean;
  /**
   * Lowers the FAB's elevation and places it into the `lowered` state.
   */
  reducedTouchTarget?: boolean;
}
