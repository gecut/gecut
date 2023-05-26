import type { BaseContent } from './base/base-content';
import type { MdDialog } from '@material/web/dialog/dialog';

export type DialogRendererReturn = MdDialog;

export interface DialogContent
  extends BaseContent<DialogRendererReturn, 'header' | 'footer'> {
  component: 'dialog';
  type: 'dialog';

  /**
   * Opens the dialog when set to `true` and closes it when set to `false`.
   */
  open: boolean;
  /**
   * Setting fullscreen displays the dialog fullscreen on small screens.
   * This can be customized via the `fullscreenBreakpoint` property.
   * When showing fullscreen, the header will take up less vertical space, and
   * the dialog will have a `showing-fullscreen`attribute, allowing content to
   * be styled in this state.
   *
   * Dialogs can be sized by setting:
   *
   * * --md-dialog-container-min-block-size
   * * --md-dialog-container-max-block-size
   * * --md-dialog-container-min-inline-size
   * * --md-dialog-container-max-inline-size
   *
   * These are typically configured via media queries and are independent of the
   * fullscreen setting.
   */
  fullscreen: boolean;
  /**
   * A media query string specifying the breakpoint at which the dialog
   * should be shown fullscreen. Note, this only applies when the `fullscreen`
   * property is set.
   *
   * By default, the dialog is shown fullscreen on screens less than 600px wide
   * or 400px tall.
   */
  fullscreenBreakpoint: string;
  /**
   * Hides the dialog footer, making any content slotted into the footer
   * inaccessible.
   */
  footerHidden: boolean;
  /**
   * Renders footer content in a vertically stacked alignment rather than the
   * normal horizontal alignment.
   */
  stacked: boolean;
  /**
   * When the dialog is closed it dispatches `closing` and `closed` events.
   * These events have an action property which has a default value of
   * the value of this property. Specific actions have explicit values but when
   * a value is not specified, the default is used. For example, clicking the
   * scrim, pressing escape, or clicking a button with an action attribute set
   * produce an explicit action.
   *
   * Defaults to `close`.
   */
  defaultAction: string;
  /**
   * The name of an attribute which can be placed on any element slotted into
   * the dialog. If an element has an action attribute set, clicking it will
   * close the dialog and the `closing` and `closed` events dispatched will
   * have their action property set the the value of this attribute on the
   * clicked element.The default value is `dialogAction`. For example,
   *
   *   <md-dialog>
   *    Content
   *     <md-filled-button slot="footer"dialogAction="buy">
   *       Buy
   *     </md-filled-button>
   *   </md-dialog>
   */
  actionAttribute: string;
  /**
   * When the dialog is opened, it will focus the first element which has
   * an attribute name matching this property. The default value is
   * `dialogFocus`. For example:
   *
   *  <md-dialog>
   *    <md-filled-text-field
   *      label="Enter some text"
   *      dialogFocus
   *    >
   *    </md-filled-text-field>
   *  </md-dialog>
   */
  focusAttribute: string;
  /**
   * Clicking on the scrim surrounding the dialog closes the dialog.
   * The `closing` and `closed` events this produces have an `action` property
   * which is the value of this property and defaults to `close`.
   */
  scrimClickAction: string;
  /**
   * Pressing the `escape` key while the dialog is open closes the dialog.
   * The `closing` and `closed` events this produces have an `action` property
   * which is the value of this property and defaults to `close`.
   */
  escapeKeyAction: string;
  /**
   * When opened, the dialog is displayed modeless or non-modal. This
   * allows users to interact with content outside the dialog without
   * closing the dialog and does not display the scrim around the dialog.
   */
  modeless: boolean;
  /**
   * Set to make the dialog position draggable.
   */
  draggable: boolean;
}
