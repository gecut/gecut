import type { BaseContent } from './base/base-content';
import type { MdCheckbox } from '@material/web/checkbox/checkbox';

export type CheckboxRendererReturn = MdCheckbox;

export interface CheckboxContent
  extends BaseContent<
    CheckboxRendererReturn,
    {
      /**
       * Whether or not the checkbox is selected.
       */
      checked?: boolean;
      /**
       * Whether or not the checkbox is disabled.
       */
      disabled?: boolean;
      /**
       * Whether or not the checkbox is invalid.
       */
      error?: boolean;
      /**
       * Whether or not the checkbox is indeterminate.
       *
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes
       */
      indeterminate?: boolean;
      /**
       * The value of the checkbox that is submitted with a form when selected.
       *
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value
       */
      value?: string;
      /**
       * The HTML name to use in form submission.
       */
      name?: string;
    }
  > {
  component: 'checkbox';
  type: 'checkbox';
}
