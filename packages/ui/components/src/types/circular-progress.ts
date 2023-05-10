// import { CircularProgress } from '@material/web/circularprogress/lib/circular-progress'

export type CircularProgressContent = {
  component: 'progress';
  type: 'circular';
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
};
