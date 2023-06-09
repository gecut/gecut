import config from '#hami/config';
import i18n from '#hami/ui/i18n';
import { attachRouter } from '#hami/ui/router';

import { signalElement } from '@gecut/mixins';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import '@material/web/icon/icon';
import '@material/web/labs/navigationbar/navigation-bar';
import '@material/web/labs/navigationtab/navigation-tab';
import { html, nothing, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import IconLanguageRounded from 'virtual:icons/material-symbols/language';
import IconMenuRounded from 'virtual:icons/material-symbols/menu-rounded';
import { registerSW } from 'virtual:pwa-register';

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
    indeterminate: true,
    styleVars: { '--_size': '40px' },
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

  @query('div.fixed')
  private fixedDivision?: HTMLDivElement;

  override connectedCallback(): void {
    super.connectedCallback();

    registerSW({});

    i18n.init();

    this.addSignalListener('top-app-bar', (value) => {
      this.topAppBarContent = {
        ...this.topAppBarContent,
        ...value,
      };
    });

    this.addSignalListener('promises-list', (value) => {
      if (
        this.topAppBarContent.trailingSlotList != null &&
        this.topAppBarContent.trailingSlotList[0] != null
      ) {
        if (
          value.length > 0 &&
          this.topAppBarContent.trailingSlotList[0].component !==
            'circular-progress'
        ) {
          dispatch('top-app-bar', {
            trailingSlotList: [AppRoot.topAppBarLoadingSlot],
          });
        }

        if (
          value.length === 0 &&
          this.topAppBarContent.trailingSlotList[0].component !== 'icon-button'
        ) {
          dispatch('top-app-bar', {
            trailingSlotList: [AppRoot.topAppBarTrailingSlot],
          });
        }
      } else {
        dispatch('top-app-bar', {
          trailingSlotList: [AppRoot.topAppBarLoadingSlot],
        });
      }
    });

    this.addSignalListener('top-app-bar-hidden', (hidden) => {
      this.topAppBarHidden = hidden;
    });

    this.addSignalListener('bottom-app-bar-hidden', (hidden) => {
      this.bottomAppBarHidden = hidden;
    });

    this.addSignalListener('snack-bar', this.snackBarSignalListener);

    this.addSignalListener('dialog', this.dialogSignalListener);
    
    this.addSignalListener('fab', this.fabSignalListener);
  }

  override render(): RenderResult {
    return html`
      ${AppRoot.renderTopAppBar(this.topAppBarContent, this.topAppBarHidden)}

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

  static renderTopAppBar(
    content: M3.Types.TopAppBarContent,
    hidden = false
  ): RenderResult {
    if (hidden === true) return nothing;

    return html`<top-app-bar .content=${content}></top-app-bar>`;
  }

  static renderNavigationBar(
    navigationTabs: M3.Types.NavigationTabContent[],
    hidden = false
  ): RenderResult {
    if (hidden === true) return nothing;

    const navigationTabsTemplate = navigationTabs.map(this.renderNavigationTab);

    return html`
      <md-navigation-bar .activeIndex=${0}>
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
          hideInactiveLabel
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

  private fabSignalListener(content: M3.Types.FABContent) {
    if (this.fixedDivision == null) return;

    const oldFAB = this.fixedDivision.querySelector('md-fab');

    oldFAB?.remove();

    this.fixedDivision.appendChild(M3.Renderers.renderFAB(content));
  }

  private snackBarSignalListener(content: M3.Types.SnackBarContent) {
    if (this.fixedDivision == null) return;

    const oldSnackBar = this.fixedDivision.querySelector('snack-bar');

    if (content.message === oldSnackBar?.message) return;

    if (oldSnackBar != null) {
      oldSnackBar.addEventListener('closed', () => {
        this.fixedDivision?.appendChild(M3.Renderers.renderSnackBar(content));
      });

      oldSnackBar.close();
    } else {
      this.fixedDivision.appendChild(M3.Renderers.renderSnackBar(content));
    }
  }

  private dialogSignalListener(content: M3.Types.DialogContent) {
    if (this.fixedDivision == null) return;

    const dialog = M3.Renderers.renderDialog(content);

    dialog.addEventListener('closed', () => {
      dialog.remove();
    });

    this.fixedDivision.appendChild(dialog);

    requestAnimationFrame(() => {
      dialog.open = true;
    });
  }
}
