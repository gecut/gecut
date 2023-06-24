import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { NewOrderData } from './new-order.data';

import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-new-order': PageNewOrder;
  }
}

@customElement('page-new-order')
export class PageNewOrder extends NewOrderData {
  override render(): RenderResult {
    super.render();

    return html`${this.slideStates[this.state]()}`;
  }
}
