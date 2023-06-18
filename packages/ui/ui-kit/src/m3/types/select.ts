import type { BaseContent } from './base/base-content';
import type { MdFilledSelect } from '@material/web/select/filled-select';
import type { MdOutlinedSelect } from '@material/web/select/outlined-select';

export type SelectRendererReturn = MdFilledSelect | MdOutlinedSelect;

export interface SelectContent extends BaseContent<SelectRendererReturn> {
  component: 'select';
  type: 'filled' | 'outlined';

  /**
   * Opens the menu synchronously with no animation.
   */
  quick?: boolean;
  /**
   * Whether or not the select is required.
   */
  required?: boolean;
  /**
   * Disables the select.
   */
  disabled?: boolean;
  /**
   * The error message that replaces supporting text when `error` is true. If
   * `errorText` is an empty string, then the supporting text will continue to
   * show.
   *
   * Calling `reportValidity()` will automatically update `errorText` to the
   * native `validationMessage`.
   */
  errorText?: string;
  /**
   * The floating label for the field.
   */
  label?: string;
  /**
   * Conveys additional information below the text field, such as how it should
   * be used.
   */
  supportingText?: string;
  /**
   * Gets or sets whether or not the text field is in a visually invalid state.
   *
   * Calling `reportValidity()` will automatically update `error`.
   */
  error?: boolean;
  /**
   * Whether or not the underlying md-menu should be position: fixed to display
   * in a top-level manner.
   */
  menuFixed?: boolean;
  /**
   * The max time between the keystrokes of the typeahead select / menu behavior
   * before it clears the typeahead buffer.
   */
  typeaheadBufferTime?: number;
  /**
   * Whether or not the text field has a leading icon. Used for SSR.
   */
  hasLeadingIcon?: boolean;
  /**
   * Whether or not the text field has a trailing icon. Used for SSR.
   */
  hasTrailingIcon?: boolean;
  /**
   * Text to display in the field. Only set for SSR.
   */
  displayText?: string;
  /**
   * The value of the currently selected option.
   *
   * Note: For SSR, set `[selected]` on the requested option and `displayText`
   * rather than setting `value` setting `value` will incur a DOM query.
   */
  value?: string;
  /**
   * The index of the currently selected option.
   *
   * Note: For SSR, set `[selected]` on the requested option and `displayText`
   * rather than setting `selectedIndex` setting `selectedIndex` will incur a
   * DOM query.
   */
  selectedIndex?: number;
}
