import type { BaseContent } from './base/base-content';
import type { MdCircularProgress } from '@material/web/circularprogress/circular-progress';

export type CircularProgressRendererReturn = MdCircularProgress;

export interface CircularProgressContent
  extends BaseContent<CircularProgressRendererReturn, never> {
  component: 'circular-progress';
  type: 'circular-progress';
  /**
   * Progress to display, a fraction between 0 and 1.
   */
  progress?: number;
  /**
   * Whether or not to display an animated spinner representing indeterminate
   * progress.
   */
  indeterminate?: boolean;
  /**
   * Whether or not to render indeterminate mode using 4 colors instead of one.
   *
   */
  fourColor?: boolean;
}
