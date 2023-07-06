import { notFoundListCard } from '#hami/content/cards/not-found-list-card';
import { orderCard } from '#hami/content/cards/order-card';
import { newOrderFAB } from '#hami/content/fabs/new-order-fab';
import { dateSelect } from '#hami/content/selects/date-select';
import { headingPageTypography } from '#hami/content/typographies/heading-page-typography';
import { ifAdmin } from '#hami/controllers/if-admin';
import { PageBase } from '#hami/ui/helpers/page-base';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';
import { Lit, M3 } from '@gecut/ui-kit';
import {
  gecutAnimationFrame,
  gecutIdleCallback,
  join,
  uniqueArray,
} from '@gecut/utilities';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html, nothing, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import styles from './orders.page.scss?inline';

import type { Projects, RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-orders': PageOrders;
  }
}

@customElement('page-orders')
export class PageOrders extends PageBase {
  static override styles = [unsafeCSS(styles), ...PageBase.styles];

  @state()
  private orders: Record<string, Projects.Hami.OrderModel> = {};

  @state()
  private suppliers: Record<string, Projects.Hami.Supplier> = {};

  @state()
  private isAdmin = false;

  private dateFilter = new Date();

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

    return html`${headline}${this.renderDateFilterSelect()}${this.renderOrderList()}`;
  }

  static filterDateByOrder(timestamp: number, date: Date): boolean {
    const orderTime = new Date(timestamp);
    const orderTimeFilter = join(
        '-',
        orderTime.getFullYear().toString(),
        orderTime.getMonth().toString(),
        orderTime.getDate().toString()
    );
    const timeFilter = join(
        '-',
        date.getFullYear().toString(),
        date.getMonth().toString(),
        date.getDate().toString()
    );

    return orderTimeFilter === timeFilter;
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

      attributes: {
        layout: flow({
          direction: 'vertical',
        }),

        items: Object.values(this.orders)
            .filter(
                (order) =>
                  order.active === true &&
              PageOrders.filterDateByOrder(
                  order.evacuationDate,
                  this.dateFilter
              )
            )
            .sort((a, b) => a.registrationDate - b.registrationDate)
            .sort((a, b) => statusPriority[a.status] - statusPriority[b.status])
            .reverse(),

        renderItem: (order) =>
          html`${M3.Renderers.renderSurfaceCard(
            orderCard(order, this.isAdmin, supplierList)
          )}`,
      },
    });
  }

  private renderDateFilterSelect() {
    if (Object.keys(this.orders).length === 0) return nothing;

    const dateList: number[] = uniqueArray(
        Object.values(this.orders)
            .filter((order) => order.active === true)
            .map((order) => order.evacuationDate)
    );

    return M3.Renderers.renderSelect(
        dateSelect(
            this.dateFilter.getTime(),
            {
              attributes: {
                styles: {
                  'margin-bottom': 'calc(2*var(--sys-spacing-track))',
                },
              },
              transformers: (target) => {
                target.addEventListener('change', () => {
                  this.dateFilter = new Date(Number(target.value));

                  gecutIdleCallback(() => {
                    gecutAnimationFrame(() => {
                      this.requestUpdate('dateFilter');
                    });
                  });
                });

                return target;
              },
            },
            dateList.map((date) => new Date(date))
        )
    );
  }
}

const statusPriority = {
  awaitingConfirmation: 10_000,
  accepted: 1_000,
  evacuated: 100,
  canceled: 10,
  failed: 1,
};
