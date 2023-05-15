// import type { IconButton } from '@material/web/iconbutton/lib/icon-button';

import type { CustomConfigFunction } from './custom-config-function';
import type { IconContent } from './icon';
import type { MdFilledIconButton } from '@material/web/iconbutton/filled-icon-button';
import type { MdFilledTonalIconButton } from '@material/web/iconbutton/filled-tonal-icon-button';
import type { MdOutlinedIconButton } from '@material/web/iconbutton/outlined-icon-button';
import type { MdStandardIconButton } from '@material/web/iconbutton/standard-icon-button';

export type IconButtonContent = {
  component: 'icon-button';
  type: 'standard' | 'outlined' | 'filled' | 'filled-tonal';
  slot?: string;
  /**
   * Disables the icon button and makes it non-interactive.
   */
  disabled?: boolean;
  /**
   * Flips the icon if it is in an RTL context at startup.
   */
  flipIconInRtl?: boolean;
  /**
   * Sets the underlying `HTMLAnchorElement`'s `href` resource attribute.
   */
  href?: string;
  /**
   * Sets the underlying `HTMLAnchorElement`'s `target` attribute.
   */
  target?: string;
  /**
   * The `aria-label` of the button when the button is toggleable and selected.
   */
  selectedAriaLabel?: string;
  /**
   * When true, the button will toggle between selected and unselected
   * states
   */
  toggle?: boolean;
  /**
   * Sets the selected state. When false, displays the default icon. When true,
   * displays the `selectedIcon`, or the default icon If no `selectedIcon` is
   * provided.
   */
  selected?: boolean;
  icon: IconContent;

  classes?: string[];

  customConfig?: CustomConfigFunction<
    | MdStandardIconButton
    | MdFilledIconButton
    | MdFilledTonalIconButton
    | MdOutlinedIconButton
  >;
};
