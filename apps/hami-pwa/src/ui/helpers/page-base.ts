import { requireSignIn } from '#hami/controllers/require-sign-in';
import elementStyle from '#hami/ui/stylesheets/element.scss?inline';
import pageStyle from '#hami/ui/stylesheets/page.scss?inline';

import { scheduleSignalElement } from '@gecut/mixins';
import { dispatch, getValue, request } from '@gecut/signal';
import { gecutCancelIdleCallback, gecutIdleCallback } from '@gecut/utilities';
import { unsafeCSS } from 'lit';

import { urlForName } from '../router';

import type { Keys, Values } from '@gecut/types';

export abstract class PageBase<
  Data = Record<string, never>
> extends scheduleSignalElement {
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

    gecutIdleCallback(() => {
      this.topAppBarToggleMode();
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('scroll', this.topAppBarChangeMode);
  }

  protected setData<T extends keyof Data>(name: T, data: Data[T]): void {
    this.log.methodArgs?.('setData', { name, data });

    if (name in this) {
      this[name as unknown as Keys<typeof this>] = data as unknown as Values<
        typeof this
      >;
    }
  }

  protected setDataListener<T extends keyof Signals, F extends keyof Data>(
      signals: Record<T, F>
  ): void {
    this.log.methodArgs?.('setData', { signals });

    for (const [signalName, dataName] of Object.entries(signals)) {
      this.addSignalListener(signalName as T, (value) => {
        this.log.property?.(signalName, value);

        this.setData(dataName as F, value as unknown as Data[F]);
      });
    }
  }

  protected requestData<T extends keyof Providers>(
      signals: Record<T, Providers[T]>
  ): void {
    this.log.methodArgs?.('setData', { signals });

    for (const [name, args] of Object.entries(signals)) {
      request(name as keyof Providers, args as Providers[T], 'cacheFirst');
    }
  }

  private topAppBarChangeMode(): void {
    if (this.topAppBarChangeModeDebounce != null) {
      gecutCancelIdleCallback(this.topAppBarChangeModeDebounce);
    }

    this.topAppBarChangeModeDebounce = gecutIdleCallback(() =>
      this.topAppBarToggleMode()
    );
  }

  private topAppBarToggleMode() {
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
