import { html, nothing, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { loggerElement } from '@gecut/mixins';
import { map } from 'lit/directives/map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { createSignalProvider, dispatch } from '@gecut/signal';
import IconDoneRounded from 'virtual:icons/material-symbols/done-rounded';
import IconErrorOutlineRounded from 'virtual:icons/material-symbols/error-outline-rounded';
import IconWarningOutlineRounded from 'virtual:icons/material-symbols/warning-outline-rounded';
import IconStarOutlineRounded from 'virtual:icons/material-symbols/star-outline-rounded';

import '@material/web/list/list';
import '@material/web/list/list-item';
import '@material/web/icon/icon';

import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';
import i18n from '../../i18n';

import styles from './home.page.scss?inline';

import type { AlwatrDocumentStorage } from '@alwatr/type/storage';
import type { MdListItem } from '@material/web/list/list-item';
import type { Notification } from '@gecut/types/hami/notification';
import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

@customElement('page-home')
export class PageHome extends loggerElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  static notificationStorageSignal = createSignalProvider(
      'notification-storage'
  );

  @state()
  private notifications: Notification[] = [];

  override connectedCallback(): void {
    super.connectedCallback();
    
    dispatch('top-app-bar-hidden', false);
    dispatch('bottom-app-bar-hidden', false);

    this.addEventListener('scroll', this.topAppBarChangeMode);

    PageHome.notificationStorageSignal.addListener((value) =>
      this.onNotificationStorageDispatched(value)
    );

    PageHome.notificationStorageSignal.request({});
  }
  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('scroll', this.topAppBarChangeMode);

    PageHome.notificationStorageSignal.removeListener((value) =>
      this.onNotificationStorageDispatched(value)
    );
  }

  override render(): RenderResult {
    super.render();

    return PageHome.renderNotificationCard(this.notifications);
  }

  static openDetailNotificationItem(event: Event): void {
    const target = event.target as MdListItem;

    target.multiLineSupportingText = true;
  }

  static closeDetailNotificationItem(event: Event): void {
    const target = event.target as MdListItem;

    target.multiLineSupportingText = false;
  }

  static renderNotificationItem(notification: Notification): RenderResult {
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

    return html`
      <md-list-item
        class="notification-item"
        headline=${messageHeadline}
        supportingText=${messageSupportingText}
        @focus=${PageHome.openDetailNotificationItem}
        @blur=${PageHome.closeDetailNotificationItem}
      >
        <md-icon slot="start" class="icon-${notification.status}">
          ${unsafeSVG(String(icon))}
        </md-icon>
      </md-list-item>
    `;
  }

  static renderNotificationCard(notifications: Notification[]): RenderResult {
    if (notifications.length === 0) return nothing;

    return html`
      <div class="card-box">
        <h3 class="title">${i18n.message('notification_box_title')}</h3>

        <div class="card">
          <div class="card-scroll">
            <md-list>
              ${map(notifications, PageHome.renderNotificationItem)}
            </md-list>
          </div>

          <md-elevation></md-elevation>
        </div>
      </div>
    `;
  }

  private onNotificationStorageDispatched(
      notificationStorage: AlwatrDocumentStorage<Notification>
  ): void {
    this.notifications = Object.values(notificationStorage.data);
  }

  private topAppBarChangeMode(): void {
    const scrollY = this.scrollTop;

    if (Math.floor(scrollY / 10) != 0) {
      dispatch('top-app-bar', {
        mode: 'on-scroll',
      });
    } else {
      dispatch('top-app-bar', {
        mode: 'flat',
      });
    }
  }
}
