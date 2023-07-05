import type { BaseContent } from './base/base-content';
import type { MdRadio } from '@material/web/radio/radio';

export type RadioRendererReturn = MdRadio;

export interface RadioContent
  extends BaseContent<
    RadioRendererReturn,
    {
      /**
       * Whether or not the radio is selected.
       */
      checked?: boolean;
      /**
       * Whether or not the radio is disabled.
       */
      disabled?: boolean;
      /**
       * The element value to use in form submission when checked.
       */
      value?: string;
      /**
       * The HTML name to use in form submission.
       */
      name?: string;
    }
  > {
  component: 'radio';
  type: 'radio';
}
