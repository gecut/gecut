import { renderListItem, renderTextField } from '@gecut/ui-kit';
import { signalElement } from '@gecut/mixins';
import { html, nothing } from 'lit';
import { state } from 'lit/decorators/state.js';
import { repeat } from 'lit/directives/repeat.js';
import IconDoneRounded from 'virtual:icons/material-symbols/done-rounded';
import IconErrorOutlineRounded from 'virtual:icons/material-symbols/error-outline-rounded';
import IconStarOutlineRounded from 'virtual:icons/material-symbols/star-outline-rounded';
import IconWarningOutlineRounded from 'virtual:icons/material-symbols/warning-outline-rounded';

import i18n from '../../i18n';

import type { RenderResult, Projects } from '@gecut/types';

export class HomeComponents extends signalElement {
  @state()
  protected notifications: Projects.Hami.Notification[] = [];

  @state()
  protected productsPrice: Projects.Hami.ProductPrice[] = [];

  @state()
  protected productsPriceSearchQuery = '';

  override connectedCallback(): void {
    super.connectedCallback();

    this.addSignalListener('notification-storage', (value) => {
      this.notifications = Object.values(value.data);
    });
    this.addSignalListener('product-price-storage', (value) => {
      this.productsPrice = Object.values(value.data);
    });
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

    return renderListItem({
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
  static renderProductPriceItem(
    productPrice: Projects.Hami.ProductPrice
  ): HTMLElement {
    return renderListItem({
      component: 'list-item',
      type: 'list-item',
      headline: productPrice.name,
      supportingText: productPrice.normalPrice.toLocaleString(),
      trailingSupportingText: productPrice.minPrice.toLocaleString(),
      classes: ['product-price-item'],
    });
  }

  protected renderNotificationCard(): RenderResult {
    if (this.notifications.length === 0) return nothing;

    return html`
      <div class="card-box">
        <h3 class="title">
          ${i18n.message('home_page_notification_box_title')}
        </h3>

        <div class="card">
          <div class="card-scroll">
            <md-list>
              ${repeat(
    this.notifications,
    (notification) => notification.id,
    HomeComponents.renderNotificationItem
  )}
            </md-list>
          </div>

          <md-elevation></md-elevation>
        </div>
      </div>
    `;
  }

  protected renderProductPriceSearchBox(): HTMLElement {
    return renderTextField({
      component: 'text-field',
      type: 'outlined',

      inputType: 'search',
      name: 'productPriceSearch',
      placeholder: 'product-price-search',

      customConfig: (target) => {
        target.addEventListener('input', () => {
          this.productsPriceSearchQuery = target.value;
        });

        return target;
      },
    });
  }
  protected renderProductPriceCard(): RenderResult {
    if (this.productsPrice.length === 0) return nothing;

    let productsPrice = this.productsPrice;

    if (this.productsPriceSearchQuery.trim() !== '') {
      productsPrice = this.productsPrice.filter((productPrice) => {
        return productPrice.name.indexOf(this.productsPriceSearchQuery) != -1;
      });
    }

    return html`
      <div class="card-box">
        <h3 class="title">
          ${i18n.message('home_page_product_price_box_title')}
        </h3>

        <div class="search-box">${this.renderProductPriceSearchBox()}</div>

        <div class="card">
          <div class="card-scroll">
            <md-list>
              ${repeat(
    productsPrice,
    (productPrice) => productPrice.id,
    HomeComponents.renderProductPriceItem
  )}
            </md-list>
          </div>

          <md-elevation></md-elevation>
        </div>
      </div>
    `;
  }
}
