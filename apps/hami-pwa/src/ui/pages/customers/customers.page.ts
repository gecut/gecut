import { Customer } from '#hami/content';
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

import styles from './customers.page.scss?inline';

import type { Projects, RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-customers': PageCustomers;
  }
}

@customElement('page-customers')
export class PageCustomers extends scheduleSignalElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  @state()
  private filteredCustomers: Projects.Hami.CustomerModel[] = [];

  private customers: Projects.Hami.CustomerModel[] = [];
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
    styles: { width: '100%' },
    customConfig: (target) => {
      target.addEventListener('input', () => {
        this.query = target.value;

        this.requestUpdateCustomers();
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

    this.addSignalListener('customer-storage', (value) => {
      this.log.property?.('customer-storage', value);

      this.customers = Object.values(value.data);

      this.requestUpdateCustomers();
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

  static renderCustomerItem(
    customer: Projects.Hami.CustomerModel
  ): HTMLElement {
    return M3.Renderers.renderListItem({
      component: 'list-item',
      type: 'list-item',
      headline: `${customer.firstName} ${customer.lastName}`,
      supportingText: `${i18n.message(
        'customers_information_box_item_description'
      )}: ${customer.description}`,
      trailingSupportingText: `${customer.orderList.length} ${i18n.message(
        'customers_information_box_item_order'
      )}`,
      classes: ['customer-item'],
      customConfig: (target) => {
        target.addEventListener('click', () => {
          dispatch('dialog', Customer.customerProfileDialog(customer));
        });

        return target;
      },
    });
  }

  protected firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    requestIdleCallback(() => {
      request('customer-storage', {});
    });
  }

  private renderCustomersCard(): RenderResult {
    if (this.customers.length === 0) return nothing;

    return html`
      <div class="card-box">
        <h3 class="title">
          ${i18n.message('customers_information_box_title')}
        </h3>

        <div class="search-box">${this.productsPriceSearchBoxComponent}</div>

        <div class="card">
          <div class="card-scroll">
            <md-list
              style="min-height:min(58vh,${72 * this.filteredCustomers.length +
              1}px);"
            >
              ${virtualize({
    scroller: true,
    items: this.filteredCustomers,
    layout: flow({ direction: 'vertical' }),
    renderItem: (customer) => {
      return html`${PageCustomers.renderCustomerItem(customer)}`;
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

  private requestUpdateCustomers(): void {
    requestAnimationFrame(() => {
      if (this.query.trim() !== '') {
        this.filteredCustomers = this.customers.filter(
          (customer) =>
            String(
              customer.firstName + customer.lastName + customer.phoneNumber
            ).indexOf(this.query.trim()) !== -1
        );
      } else {
        this.filteredCustomers = this.customers;
      }
    });
  }
}
