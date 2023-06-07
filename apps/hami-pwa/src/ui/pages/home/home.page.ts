import { notificationListCard } from '#hami/content/cards/notification-list-card';
import { requireSignIn } from '#hami/controllers/require-sign-in';
import '#hami/ui/components/product-price-card/product-price-card';
import i18n from '#hami/ui/i18n';
import { urlForName } from '#hami/ui/router';
import elementStyle from '#hami/ui/stylesheets/element.scss?inline';
import pageStyle from '#hami/ui/stylesheets/page.scss?inline';

import { scheduleSignalElement } from '@gecut/mixins';
import {
  createSignalProvider,
  dispatch,
  getValue,
  request,
} from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { html, nothing, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import IconSearchOutlineRounded from 'virtual:icons/material-symbols/search-rounded';

import styles from './home.page.scss?inline';

import type { Projects, RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

@customElement('page-home')
export class PageHome extends scheduleSignalElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  static productPriceStorageSignal = createSignalProvider(
    'product-price-storage'
  );

  @state()
  protected notificationStorage = getValue('notification-storage')?.data ?? {};

  @state()
  protected productsPrice: Projects.Hami.ProductPrice[] = Object.values(
      PageHome.productPriceStorageSignal.value?.data ?? {}
    );

  private topAppBarChangeModeDebounce?: NodeJS.Timeout;
  private productsPriceSearchBoxComponent = M3.Renderers.renderTextField({
    component: 'text-field',
    type: 'outlined',

    inputType: 'search',
    name: 'productPriceSearch',
    label: i18n.message('home_page_product_price_box_search_placeholder'),
    hasLeadingIcon: true,
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        SVG: IconSearchOutlineRounded,
        slot: 'leadingicon',
      },
    ],
    styles: { width: '100%' },
    customConfig: (target) => {
      target.addEventListener('input', () => {
        requestAnimationFrame(() => {
          this.searchProductPrice(target.value.trim());
        });
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

    this.addSignalListener('notification-storage', (value) => {
      this.log.property?.('notification-storage', value);

      this.notificationStorage = value.data ?? {};
    });
    this.addSignalListener('product-price-storage', (value) => {
      this.log.property?.('product-price-storage', value);

      this.productsPrice = Object.values(value.data);
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('scroll', this.topAppBarChangeMode);
  }

  override render(): RenderResult {
    super.render();

    return html`
      ${this.renderNotificationCard()} ${this.renderProductPriceCard()}
    `;
  }

  protected firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    requestIdleCallback(() => {
      request('notification-storage', {});
      PageHome.productPriceStorageSignal.request({});
    });
  }

  private renderNotificationCard(): RenderResult {
    if (Object.keys(this.notificationStorage).length === 0) return nothing;

    return html`
      <div class="card-box">
        <h3 class="title">
          ${i18n.message('home_page_notification_box_title')}
        </h3>

        ${notificationListCard(Object.values(this.notificationStorage))}
      </div>
    `;
  }

  private renderProductPriceCard(): RenderResult {
    if (this.productsPrice.length === 0) return nothing;

    return html`
      <div class="card-box">
        <h3 class="title">
          ${i18n.message('home_page_product_price_box_title')}
        </h3>

        <div class="search-box">${this.productsPriceSearchBoxComponent}</div>

        <product-price-card
          .content=${{ data: this.productsPrice }}
        ></product-price-card>
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

  private searchProductPrice(query: string): void {
    this.log.methodArgs?.('searchProductPrice', { query });

    const productPriceCard =
      this.renderRoot.querySelector('product-price-card');

    if (productPriceCard != null) {
      if (query !== '') {
        productPriceCard.content = {
          data: this.productsPrice.filter((productPrice) =>
            productPrice.name.includes(query)
          ),
        };
      } else {
        productPriceCard.content = { data: this.productsPrice };
      }
    }
  }
}
