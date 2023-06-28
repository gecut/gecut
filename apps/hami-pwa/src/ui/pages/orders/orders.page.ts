import { notFoundListCard } from '#hami/content/cards/not-found-list-card';
import { orderCard } from '#hami/content/cards/order-card';
import { newOrderFAB } from '#hami/content/fabs/new-order-fab';
import { headingPageTypography } from '#hami/content/typographies/heading-page-typography';
import { ifAdmin } from '#hami/controllers/if-admin';
import { PageBase } from '#hami/ui/helpers/page-base';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';
import { Lit, M3 } from '@gecut/ui-kit';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
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

  @state()
  private isAdmin = false;

  override connectedCallback(): void {
    super.connectedCallback();

    ifAdmin(() => {
      this.isAdmin = true;

      dispatch('fab', [newOrderFAB()]);
    });

    this.addSignalListener('order-storage', (value) => {
      this.log.property?.('order-storage', value);

      this.orders = value.data;
    });
    this.addSignalListener('supplier-storage', (value) => {
      this.log.property?.('supplier-storage', value);

      this.suppliers = value.data;
    });
  }

  override render(): RenderResult {
    super.render();

    const headline = M3.Renderers.renderTypoGraphy(
      headingPageTypography(i18n.msg('orders'))
    );

    return html`${headline}${this.renderOrderList()}`;
  }

  protected firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    request('order-storage', {}, 'cacheFirst');
    request('supplier-storage', {}, 'cacheFirst');
  }

  private renderOrderList() {
    if (Object.values(this.orders).length === 0) {
      return M3.Renderers.renderSurfaceCard(notFoundListCard());
    }

    const supplierList = Object.values(this.suppliers);

    return Lit.Renderers.renderLitVirtualizer({
      component: 'lit-virtualizer',
      type: 'lit-virtualizer',

      layout: flow({
        direction: 'vertical',
      }),

      items: Object.values(this.orders)
        .filter((order) => order.active === true)
        .sort((a, b) => a.registrationDate - b.registrationDate)
        .sort((a, b) => statusPriority[a.status] - statusPriority[b.status])
        .reverse(),

      renderItem: (order) =>
        html`${M3.Renderers.renderSurfaceCard(
          orderCard(order, this.isAdmin, supplierList)
        )}`,
    });
  }
}

const statusPriority = {
  awaitingConfirmation: 10_000,
  accepted: 1_000,
  evacuated: 100,
  canceled: 10,
  failed: 1,
};
