import { signalElement } from '@gecut/mixins';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import '@gecut/ui-kit/m3';
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
export class AppRoot extends signalElement {
  static override styles = [unsafeCSS(styles)];

  static topAppBarLoadingSlot: M3.Types.CircularProgressContent = {
    component: 'circular-progress',
    type: 'circular-progress',
    fourColor: true,
    indeterminate: true,
  };
  static topAppBarTrailingSlot: M3.Types.IconButtonContent = {
    component: 'icon-button',
    type: 'standard',
    iconSVG: IconLanguageRounded,
  };

  @state()
  private topAppBarContent: M3.Types.TopAppBarContent = {
      component: 'top-app-bar',
      type: 'center',
      headline: getDate(),
      leadingSlot: <M3.Types.IconButtonContent>{
        component: 'icon-button',
        type: 'standard',
        iconSVG: IconMenuRounded,
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

    this.addSignalListener('top-app-bar', (value) => {
      this.topAppBarContent = {
        ...this.topAppBarContent,
        ...value,
      };
    });

    this.addSignalListener('promises-list', (value) => {
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

    this.addSignalListener('top-app-bar-hidden', (hidden) => {
      this.topAppBarHidden = hidden;
    });

    this.addSignalListener('bottom-app-bar-hidden', (hidden) => {
      this.bottomAppBarHidden = hidden;
    });

    this.addSignalListener('snack-bar', (content) => {
      const fixedBox =
        this.renderRoot.querySelector<HTMLDivElement>('div.fixed');

      if (fixedBox != null) {
        const oldSnackBar = fixedBox.querySelector('snack-bar');
        let waiting = 0;

        if (oldSnackBar != null) {
          oldSnackBar.closeSnackBar();
          waiting = 200;
        }

        setTimeout(() => {
          requestAnimationFrame(() => {
            fixedBox.appendChild(M3.Renderers.renderSnackBar(content));
          });
        }, waiting);
      }
    });
  }

  override render(): RenderResult {
    return html`
      <top-app-bar
        .content=${this.topAppBarContent}
        ?hidden=${this.topAppBarHidden}
      ></top-app-bar>
      <main role="main">
        <div class="fixed"></div>
      </main>

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
    navigationTabs: M3.Types.NavigationTabContent[],
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

  static renderNavigationTab(tab: M3.Types.NavigationTabContent): RenderResult {
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
