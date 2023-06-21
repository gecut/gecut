import { requireSignIn } from '#hami/controllers/require-sign-in';
import elementStyle from '#hami/ui/stylesheets/element.scss?inline';
import pageStyle from '#hami/ui/stylesheets/page.scss?inline';

import { scheduleSignalElement } from '@gecut/mixins';
import { dispatch, getValue } from '@gecut/signal';
import { unsafeCSS } from 'lit';

import { urlForName } from '../router';

export abstract class PageBase extends scheduleSignalElement {
  static topAppBarRangeScroll = 2;
  static override styles = [unsafeCSS(elementStyle), unsafeCSS(pageStyle)];

  private topAppBarChangeModeDebounce?: number;

  override connectedCallback(): void {
    super.connectedCallback();

    requireSignIn({ catchUrl: urlForName('Landing') });

    dispatch('fab', []);
    dispatch('top-app-bar-hidden', false);
    dispatch('bottom-app-bar-hidden', false);

    this.addEventListener('scroll', this.topAppBarChangeMode);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('scroll', this.topAppBarChangeMode);
  }

  private topAppBarChangeMode(): void {
    if (this.topAppBarChangeModeDebounce != null) {
      cancelIdleCallback(this.topAppBarChangeModeDebounce);
    }

    this.topAppBarChangeModeDebounce = requestIdleCallback(() =>
      this.topAppBarSetMode()
    );
  }

  private topAppBarSetMode() {
    const scrollY = Math.floor(this.scrollTop / 10);
    const mode = getValue('top-app-bar')?.mode;

    this.log.methodArgs?.('topAppBarSetMode', { scrollY, mode });

    if (scrollY > PageBase.topAppBarRangeScroll && mode !== 'on-scroll') {
      dispatch('top-app-bar', {
        mode: 'on-scroll',
      });
    }

    if (scrollY <= PageBase.topAppBarRangeScroll && mode !== 'flat') {
      dispatch('top-app-bar', {
        mode: 'flat',
      });
    }
  }
}
