import { orderCard } from '#hami/content/cards/order-card';
import { newOrderFAB } from '#hami/content/fabs/new-order-fab';
import { PageBase } from '#hami/ui/helpers/page-base';

import { dispatch, request } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import styles from './orders.page.scss?inline';

import type { Projects, RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-orders': PageCustomers;
  }
}

@customElement('page-orders')
export class PageCustomers extends PageBase {
  static override styles = [unsafeCSS(styles), ...PageBase.styles];

  @state()
  private orders: Record<string, Projects.Hami.OrderModel> = {};

  @state()
  private suppliers: Record<string, Projects.Hami.Supplier> = {};

  override connectedCallback(): void {
    super.connectedCallback();

    this.addSignalListener('order-storage', (value) => {
      this.log.property?.('order-storage', value);

      this.orders = value.data;
    });
    this.addSignalListener('supplier-storage', (value) => {
      this.log.property?.('supplier-storage', value);

      this.suppliers = value.data;
    });

    dispatch('fab', [newOrderFAB()]);
  }

  override render(): RenderResult {
    super.render();

    const supplierList = Object.values(this.suppliers);
    const ordersTemplate = Object.values(this.orders).map((order) =>
      M3.Renderers.renderSurfaceCard(orderCard(order, true, supplierList))
    );

    return html`${ordersTemplate}`;
  }

  protected firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    request('order-storage', {}, 'staleWhileRevalidate');
    request('supplier-storage', {}, 'staleWhileRevalidate');
  }
}
