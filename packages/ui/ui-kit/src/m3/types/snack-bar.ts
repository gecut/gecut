import type { BaseContent } from './base/base-content';
import type { SnackBar } from '../components/snack-bar';

export type SnackBarRendererReturn = SnackBar;

export interface SnackBarContent
  extends BaseContent<
    SnackBarRendererReturn,
    {
      message: string;

      /**
       * @default `bottom`
       */
      align?: 'top' | 'bottom';
      /**
       * @default `8`
       */
      startFrom?: number;
      /**
       * @default `5_000`
       */
      duration?: number;
      /**
       * @default `false`
       */
      closeButton?: boolean;
    }
  > {
  component: 'snack-bar';
  type: 'ellipsis-message' | 'wrap-message';
}
