import { scheduleSignalElement } from '@gecut/mixins';
import { dispatch, getValue, request } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import '@lit-labs/virtualizer';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { virtualize } from '@lit-labs/virtualizer/virtualize.js';
import { html, nothing, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import IconDoneRounded from 'virtual:icons/material-symbols/done-rounded';
import IconErrorOutlineRounded from 'virtual:icons/material-symbols/error-outline-rounded';
import IconSearchOutlineRounded from 'virtual:icons/material-symbols/search-rounded';
import IconStarOutlineRounded from 'virtual:icons/material-symbols/star-outline-rounded';
import IconWarningOutlineRounded from 'virtual:icons/material-symbols/warning-outline-rounded';

import { requireSignIn } from '../../../controllers/require-sign-in';
import '../../components/product-price-card/product-price-card';
import i18n from '../../i18n';
import { urlForName } from '../../router';
import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';

import styles from './home.page.scss?inline';

import type { Projects, RenderResult } from '@gecut/types';
import type { PropertyValues, PropertyDeclaration } from 'lit';

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

  @state()
  protected notifications: Projects.Hami.Notification[] = [];

  @state()
  protected productsPrice: Projects.Hami.ProductPrice[] = [];

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
        SVG: IconSearchOutlineRounded,
        slot: 'leadingicon',
      },
    ],

    customConfig: (target) => {
      target.style.width = '100%';
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

      this.notifications = Object.values(value.data);
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

  static renderNotificationItem(
    notification: Projects.Hami.Notification
  ): HTMLElement {
    let icon = '';

    const messageWords = notification.message.split(' ');
    const messageLength = messageWords.length;
    const messageHeadlineBreakIndex = Math.round(messageLength / 3);
    const messageHeadline = messageWords
      .slice(0, messageHeadlineBreakIndex)
      .join(' ');
    const messageSupportingText = messageWords
      .slice(messageHeadlineBreakIndex, messageLength)
      .join(' ');

    switch (notification.status) {
    case 'danger':
      icon = IconErrorOutlineRounded;
      break;
    case 'warning':
      icon = IconWarningOutlineRounded;
      break;
    case 'normal':
      icon = IconStarOutlineRounded;
      break;
    case 'success':
      icon = IconDoneRounded;
      break;
    }

    return M3.Renderers.renderListItem({
      component: 'list-item',
      type: 'list-item',
      headline: messageHeadline,
      supportingText: messageSupportingText,
      multiLineSupportingText: true,
      classes: ['notification-item'],
      slotList: [
        {
          component: 'icon',
          type: 'svg',
          slot: 'start',
          SVG: icon,
          classes: [`icon-${notification.status}`],
        },
      ],
    });
  }

  protected firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    requestIdleCallback(() => {
      request('notification-storage', {});
      request('product-price-storage', {});
    });
  }

  private renderNotificationCard(): RenderResult {
    if (this.notifications.length === 0) return nothing;

    return html`
      <div class="card-box">
        <h3 class="title">
          ${i18n.message('home_page_notification_box_title')}
        </h3>

        <div class="card">
          <div class="card-scroll">
            <md-list>
              ${virtualize({
    scroller: true,
    items: this.notifications,
    layout: flow({ direction: 'vertical' }),
    renderItem: (notification) => {
      return html`${PageHome.renderNotificationItem(notification)}`;
    },
  })}
            </md-list>
          </div>

          <md-elevation></md-elevation>
        </div>
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
