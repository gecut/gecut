import { signalElement } from '@gecut/mixins';
import { M3 } from '@gecut/ui-kit';
import { html, nothing } from 'lit';
import { state } from 'lit/decorators/state.js';
import { repeat } from 'lit/directives/repeat.js';
import IconDoneRounded from 'virtual:icons/material-symbols/done-rounded';
import IconErrorOutlineRounded from 'virtual:icons/material-symbols/error-outline-rounded';
import IconStarOutlineRounded from 'virtual:icons/material-symbols/star-outline-rounded';
import IconWarningOutlineRounded from 'virtual:icons/material-symbols/warning-outline-rounded';

import '../../components/product-price-card/product-price-card';
import i18n from '../../i18n';

import type { RenderResult, Projects } from '@gecut/types';

export class HomeComponents extends signalElement {
  @state()
  protected notifications: Projects.Hami.Notification[] = [];

  @state()
  protected productsPrice: Projects.Hami.ProductPrice[] = [];

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
    return M3.Renderers.renderTextField({
      component: 'text-field',
      type: 'outlined',

      inputType: 'search',
      name: 'productPriceSearch',
      placeholder: 'product-price-search',

      customConfig: (target) => {
        target.addEventListener('input', () => {
          const query = target.value;
          const productPriceCard =
            this.renderRoot.querySelector('product-price-card');

          if (productPriceCard != null) {
            if (query.trim() !== '') {
              productPriceCard.productsPrice = this.productsPrice.filter(
                (productPrice) => productPrice.name.includes(query)
              );
            } else {
              productPriceCard.productsPrice = this.productsPrice;
            }
          }
        });

        return target;
      },
    });
  }
  protected renderProductPriceCard(): RenderResult {
    if (this.productsPrice.length === 0) return nothing;

    return html`
      <div class="card-box">
        <h3 class="title">
          ${i18n.message('home_page_product_price_box_title')}
        </h3>

        <div class="search-box">${this.renderProductPriceSearchBox()}</div>

        <product-price-card
          .productsPrice=${this.productsPrice}
        ></product-price-card>
      </div>
    `;
  }
}
