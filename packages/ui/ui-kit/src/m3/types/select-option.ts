import type { BaseContent } from './base/base-content';
import type { MdSelectOption } from '@material/web/select/select-option';

export type SelectOptionRendererReturn = MdSelectOption;

export interface SelectOptionContent
  extends BaseContent<SelectOptionRendererReturn> {
  component: 'select-option';
  type: 'select-option';

  /**
   * Form value of the option.
   */
  value: string;
  /**
   * Whether or not this option is selected.
   */
  selected?: boolean;
  /**
   * READONLY: self-identifies as a menu item and sets its identifying attribute
   */
  isMenuItem?: boolean;
  /**
   * Keeps the menu open if clicked or keyboard selected.
   */
  keepOpen?: boolean;
  /**
   * The primary, headline text of the list item.
   */
  headline?: string;
  /**
   * The one-line supporting text below the headline. Set
   * `multiLineSupportingText` to `true` to support multiple lines in the
   * supporting text.
   */
  supportingText?: string;
  /**
   * Modifies `supportingText` to support multiple lines.
   */
  multiLineSupportingText?: boolean;
  /**
   * The supporting text placed at the end of the item. Overridden by elements
   * slotted into the `end` slot.
   */
  trailingSupportingText?: string;
  /**
   * Disables the item and makes it non-selectable and non-interactive.
   */
  disabled?: boolean;
  /**
   * The tabindex of the underlying item.
   *
   * __NOTE:__ this is overridden by the keyboard behavior of `md-list` and by
   * setting `selected`.
   */
  itemTabIndex?: number;
  /**
   * Whether or not the element is actively being interacted with by md-list.
   * When active, tabindex is set to 0, and in some list item variants (like
   * md-list-item), focuses the underlying item.
   */
  active?: boolean;
  /**
   * READONLY. Sets the `md-list-item` attribute on the element.
   */
  isListItem?: boolean;
}
