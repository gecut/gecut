import pageStyle from '#persianpart/ui/stylesheets/page.css?inline';

import { createSignalProvider } from '@gecut/signal';
import { unsafeCSS } from 'lit';

import { ComponentBase } from './component-base';

export abstract class PageBase extends ComponentBase {
  static signals = {
    ...ComponentBase.signals,

    headline: createSignalProvider('headline'),
  };

  static override styles = [...ComponentBase.styles, unsafeCSS(pageStyle)];

  set headline(_headline: string | undefined) {
    this.log.property?.('headline', _headline);

    if (_headline != null) {
      PageBase.signals.headline.dispatch(_headline);
    }
  }
  get headline(): string | undefined {
    this.log.method?.('headline');

    return PageBase.signals.headline.value;
  }
}
