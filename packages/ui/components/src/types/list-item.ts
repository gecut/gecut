// import type { MdListItem } from '@material/web/list/list-item';

import type { SlotsComponentsContent } from './components';
import type { CustomConfigFunction } from './custom-config-function';
import type { MdListItem } from '@material/web/list/list-item';
import type { MdListItemLink } from '@material/web/list/list-item-link';

type ItemContent = {
  component: 'list-item';
  type: 'list-item';

  slotList?: SlotsComponentsContent[];

  /**
   * The primary, headline text of the list item.
   */
  headline: string;
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
   * The supporting text placed at the end of the item. Overriden by elements
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
   * __NOTE:__ this is overriden by the keyboard behavior of `md-list` and by
   * setting `selected`.
   */
  itemTabIndex?: number;
  /**
   * Whether or not the element is actively being interacted with by md-list.
   * When active, tabindex is set to 0, and in some list item variants (like
   * md-list-item), focuses the underlying item.
   */
  active?: boolean;

  classes?: string[];

  customConfig?: CustomConfigFunction<MdListItem | MdListItemLink>;
};

type ItemLinkContent = {
  type: 'list-item-link';
  /**
   * Sets the underlying `HTMLAnchorElement`'s `href` resource attribute.
   */
  href: string;
  /**
   * Sets the underlying `HTMLAnchorElement`'s `target` attribute.
   */
  target: string;
} & Omit<ItemContent, 'type'>;

export type ListItemContent = ItemContent | ItemLinkContent;
