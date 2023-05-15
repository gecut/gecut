// import { CircularProgress } from '@material/web/circularprogress/lib/circular-progress'

import type { CustomConfigFunction } from './custom-config-function';
import type { MdCircularProgress } from '@material/web/circularprogress/circular-progress';

export type CircularProgressContent = {
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

  classes?: string[];

  customConfig?: CustomConfigFunction<MdCircularProgress>;
};
