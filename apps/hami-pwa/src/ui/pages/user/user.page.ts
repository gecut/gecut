import { html, nothing, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { signalElement } from '@gecut/mixins';
import { dispatch, request } from '@gecut/signal';
import { renderListItem } from '@gecut/components';
import { when } from 'lit/directives/when.js';
import IconPersonOutline from 'virtual:icons/material-symbols/person-outline';
import IconCallOutline from 'virtual:icons/material-symbols/call-outline';
// import IconAccountBoxOutline from 'virtual:icons/material-symbols/account-box-outline';
// import IconLockOutline from 'virtual:icons/material-symbols/lock-outline';

import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';
import { requireSignIn } from '../../../controllers/require-sign-in';
import { urlForName } from '../../router';
import i18n from '../../i18n';

import styles from './user.page.scss?inline';

import type { TemplateResult } from 'lit';
import type { SignInResponse } from '@gecut/types/hami/user';
import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-user': PageUser;
  }
}

@customElement('page-user')
export class PageUser extends signalElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  @state()
    user?: SignInResponse;

  override connectedCallback() {
    super.connectedCallback();

    requireSignIn({ catchUrl: urlForName('Landing') });

    dispatch('top-app-bar-hidden', false);
    dispatch('bottom-app-bar-hidden', false);

    this.addSignalListener('user', (value) => {
      this.user = value;
    });

    request('user', {});
  }

  override render(): RenderResult {
    super.render();

    if (this.user == null) return nothing;

    return [PageUser.renderUserInformationCard(this.user)];
  }

  static renderUserInformationCard(user: SignInResponse): TemplateResult {
    const userInformationListTemplate = [
      renderListItem({
        component: 'listItem',
        type: 'listItem',
        headline: `${user.firstName} ${user.lastName}`,
        slotList: [
          {
            component: 'icon',
            type: 'svg',
            slot: 'start',
            SVG: IconPersonOutline,
          },
        ],
      }),
      renderListItem({
        component: 'listItem',
        type: 'listItem',
        headline: `${i18n.numberFormat(user.phoneNumber)}`,
        slotList: [
          {
            component: 'icon',
            type: 'svg',
            slot: 'start',
            SVG: IconCallOutline,
          },
        ],
      }),
    ];

    return html`
      <div class="card-box">
        <h3 class="title">${i18n.message('user_information_box_title')}</h3>

        <div class="card">
          <div class="card-scroll">
            <md-list>${userInformationListTemplate}</md-list>
          </div>

          <md-elevation></md-elevation>
        </div>
      </div>
    `;
  }
}
