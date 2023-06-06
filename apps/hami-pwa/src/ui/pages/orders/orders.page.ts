import { Orders } from '#hami/content';
import { requireSignIn } from '#hami/controllers/require-sign-in';
import '#hami/ui/components/product-price-card/product-price-card';
import i18n from '#hami/ui/i18n';
import { urlForName } from '#hami/ui/router';
import elementStyle from '#hami/ui/stylesheets/element.scss?inline';
import pageStyle from '#hami/ui/stylesheets/page.scss?inline';

import { scheduleSignalElement } from '@gecut/mixins';
import { dispatch, getValue, request } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { virtualize } from '@lit-labs/virtualizer/virtualize.js';
import { html, nothing, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import IconSearchRounded from 'virtual:icons/material-symbols/search-rounded';

import styles from './orders.page.scss?inline';

import type { Projects, RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-orders': PageCustomers;
  }
}

@customElement('page-orders')
export class PageCustomers extends scheduleSignalElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  @state()
  private filteredOrders: Projects.Hami.OrderModel[] = [];

  private orders: Projects.Hami.OrderModel[] = [];
  private query = '';

  private topAppBarChangeModeDebounce?: NodeJS.Timeout;
  private productsPriceSearchBoxComponent = M3.Renderers.renderTextField({
    component: 'text-field',
    type: 'outlined',

    inputType: 'search',
    name: 'productPriceSearch',
    placeholder: i18n.message('home_page_product_price_box_search_placeholder'),
    hasLeadingIcon: true,
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        SVG: IconSearchRounded,
        slot: 'leadingicon',
      },
    ],

    customConfig: (target) => {
      target.style.width = '100%';
      target.addEventListener('input', () => {
        this.query = target.value;

        this.requestUpdateOrder();
      });

      return target;
    },
  });

  override connectedCallback(): void {
    super.connectedCallback();

    requireSignIn({ catchUrl: urlForName('Landing') });

    dispatch('top-app-bar-hidden', false);
    dispatch('bottom-app-bar-hidden', false);

    this.addEventListener('scroll', this.topAppBarChangeMode);

    this.addSignalListener('order-storage', (value) => {
      this.log.property?.('order-storage', value);

      this.orders = Object.values(value.data);

      this.requestUpdateOrder();
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('scroll', this.topAppBarChangeMode);
  }

  override render(): RenderResult {
    super.render();

    return html`${this.renderCustomersCard()}`;
  }

  static renderOrderItem(order: Projects.Hami.OrderModel): HTMLElement {
    return M3.Renderers.renderListItem({
      component: 'list-item',
      type: 'list-item',
      headline: `${order.customer.firstName} ${order.customer.lastName}`,
      supportingText: i18n.date(order.registrationDate),
      classes: ['order-item'],
      customConfig: (target) => {
        target.addEventListener('click', () => {
          dispatch('dialog', Orders.orderDetailDialog(order));
        });

        return target;
      },
    });
  }

  protected firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    requestIdleCallback(() => {
      request('order-storage', {});
    });
  }

  private renderCustomersCard(): RenderResult {
    if (this.orders.length === 0) return nothing;

    return html`
      <div class="card-box">
        <h3 class="title">${i18n.message('orders_information_box_title')}</h3>

        <div class="search-box">${this.productsPriceSearchBoxComponent}</div>

        <div class="card">
          <div class="card-scroll">
            <md-list
              style="min-height:min(58vh,${72 * this.filteredOrders.length +
              1}px);"
            >
              ${virtualize({
    scroller: true,
    items: this.filteredOrders,
    layout: flow({ direction: 'vertical' }),
    renderItem: (order) => {
      return html`${PageCustomers.renderOrderItem(order)}`;
    },
  })}
            </md-list>
          </div>

          <md-elevation></md-elevation>
        </div>
      </div>
    `;
  }

  private topAppBarChangeMode(): void {
    if (this.topAppBarChangeModeDebounce != null) {
      clearTimeout(this.topAppBarChangeModeDebounce);
    }

    this.topAppBarChangeModeDebounce = setTimeout(() => {
      const scrollY = Math.floor(this.scrollTop / 10);

      if (scrollY > 0 && getValue('top-app-bar')?.mode !== 'on-scroll') {
        dispatch('top-app-bar', {
          mode: 'on-scroll',
        });
      }

      if (scrollY == 0 && getValue('top-app-bar')?.mode !== 'flat') {
        dispatch('top-app-bar', {
          mode: 'flat',
        });
      }
    }, 100);
  }

  private requestUpdateOrder(): void {
    requestAnimationFrame(() => {
      if (this.query.trim() !== '') {
        this.filteredOrders = this.orders.filter(
          (order) =>
            String(order.customer.firstName + order.customer.firstName).indexOf(
              this.query.trim()
            ) !== -1
        );
      } else {
        this.filteredOrders = this.orders;
      }
    });
  }
}
