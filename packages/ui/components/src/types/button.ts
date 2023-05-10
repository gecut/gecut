// import type { Button } from '@material/web/button/lib/button';

export type ButtonContent = {
  component: 'button';
  type: 'elevated' | 'filled' | 'outlined' | 'text' | 'tonal';
  /**
   * Whether or not the button is disabled.
   */
  disabled: boolean;
  /**
   * The URL that the link button points to.
   */
  href?: string;
  /**
   * Where to display the linked `href` URL for a link button. Common options
   * include `_blank` to open in a new tab.
   */
  target?: string;
  /**
   * Whether to render the icon at the inline end of the label rather than the
   * inline start.
   *
   * _Note:_ Link buttons cannot have trailing icons.
   */
  trailingIcon?: boolean;
  /**
   * Whether to display the icon or not.
   */
  hasIcon?: boolean;
  /**
   * Whether `preventDefault()` should be called on the underlying button.
   * Useful for preventing certain native functionalities like preventing form
   * submissions.
   */
  preventClickDefault?: boolean;
};
