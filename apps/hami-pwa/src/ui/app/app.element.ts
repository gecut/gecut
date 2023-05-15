import { loggerElement } from '@gecut/mixins';
import { addListener, dispatch } from '@gecut/signal';
import '@gecut/ui-kit';
import '@material/web/circularprogress/circular-progress';
import '@material/web/icon/icon';
import '@material/web/navigationbar/navigation-bar';
import '@material/web/navigationtab/navigation-tab';
import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import IconLanguageRounded from 'virtual:icons/material-symbols/language';
import IconMenuRounded from 'virtual:icons/material-symbols/menu-rounded';

import config from '../../config';
import i18n from '../i18n';
import { attachRouter } from '../router/index';

import styles from './app.element.scss?inline';

import type { RenderResult } from '@gecut/types';
import type {
  TopAppBarContent,
  CircularProgressContent,
  IconButtonContent,
  NavigationTab,
} from '@gecut/ui-kit';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}

const getDate = () => {
  const now = new Date();

  return now.toLocaleDateString(i18n.getConfig().code, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};

@customElement('app-root')
export class AppRoot extends loggerElement {
  static override styles = [unsafeCSS(styles)];

  static topAppBarLoadingSlot: CircularProgressContent = {
    component: 'circular-progress',
    type: 'circular-progress',
    indeterminate: true,
  };
  static topAppBarTrailingSlot: IconButtonContent = {
    component: 'icon-button',
    type: 'standard',
    icon: {
      component: 'icon',
      type: 'svg',
      SVG: IconLanguageRounded,
    },
  };

  @state()
  private topAppBarContent: TopAppBarContent = {
      component: 'top-app-bar',
      type: 'center',
      headline: getDate(),
      leadingSlot: {
        component: 'icon-button',
        type: 'standard',
        icon: {
          component: 'icon',
          type: 'svg',
          SVG: IconMenuRounded,
        },
      },
      trailingSlotList: [AppRoot.topAppBarTrailingSlot],
    };

  @state()
  private topAppBarHidden = false;

  @state()
  private bottomAppBarHidden = false;

  override connectedCallback(): void {
    super.connectedCallback();

    i18n.init();

    addListener('top-app-bar', (value) => {
      this.topAppBarContent = {
        ...this.topAppBarContent,
        ...value,
      };
    });

    addListener('promises-list', (value) => {
      const oldValue = this.topAppBarContent;

      if (value.length > 0) {
        dispatch('top-app-bar', {
          trailingSlotList: [AppRoot.topAppBarLoadingSlot],
        });
      } else {
        dispatch('top-app-bar', {
          trailingSlotList: [AppRoot.topAppBarTrailingSlot],
        });
      }

      this.requestUpdate('topAppBarContent', oldValue);
    });

    addListener('top-app-bar-hidden', (hidden) => {
      this.topAppBarHidden = hidden;
    });

    addListener('bottom-app-bar-hidden', (hidden) => {
      this.bottomAppBarHidden = hidden;
    });
  }

  override render(): RenderResult {
    return html`
      <top-app-bar
        .content=${this.topAppBarContent}
        ?hidden=${this.topAppBarHidden}
      ></top-app-bar>
      <main role="main"></main>
      ${AppRoot.renderNavigationBar(
    config.navigationTabs,
    this.bottomAppBarHidden
  )}
    `;
  }

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    const mainContainer = this.renderRoot.querySelector('main');

    if (mainContainer != null) {
      attachRouter(mainContainer);
    }

    window.addEventListener('vaadin-router-location-changed', () =>
      this.requestUpdate()
    );
  }

  static renderNavigationBar(
    navigationTabs: NavigationTab[],
    bottomAppBarHidden: boolean
  ): RenderResult {
    const navigationTabsTemplate = navigationTabs.map(this.renderNavigationTab);

    return html`
      <md-navigation-bar
        ?hidden=${bottomAppBarHidden}
        .activeIndex=${0}
        hideInactiveLabel
      >
        ${navigationTabsTemplate}
      </md-navigation-bar>
    `;
  }

  static renderNavigationTab(tab: NavigationTab): RenderResult {
    return html`
      <a class="navigation-tab" href=${tab.link}>
        <md-navigation-tab
          .label=${tab.label}
          .badgeValue=${tab.badgeValue}
          ?active=${tab.link === location.pathname}
          ?showBadge=${tab.showBadge}
        >
          <md-icon slot="activeIcon">
            ${unsafeSVG(String(tab.icons.active))}
          </md-icon>
          <md-icon slot="inactiveIcon">
            ${unsafeSVG(String(tab.icons.inActive))}
          </md-icon>
        </md-navigation-tab>
      </a>
    `;
  }
}
