import { scheduleSignalElement } from '@gecut/mixins';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { html, nothing, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import IconStarOutlineRounded from 'virtual:icons/material-symbols/add-rounded';
import IconAlternateEmailRounded from 'virtual:icons/material-symbols/alternate-email-rounded';
import IconAwardStarRounded from 'virtual:icons/material-symbols/award-star-rounded';
import IconCallOutlineRounded from 'virtual:icons/material-symbols/call-outline-rounded';
import IconLockOutline from 'virtual:icons/material-symbols/lock-outline';
import IconPersonOutlineRounded from 'virtual:icons/material-symbols/person-outline-rounded';

import { requireSignIn } from '../../../controllers/require-sign-in';
import '../../components/surface-card/surface-card';
import i18n from '../../i18n';
import { urlForName } from '../../router';
import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';

import styles from './user.page.scss?inline';

import type { RenderResult, Projects } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-user': PageUser;
  }
}

@customElement('page-user')
export class PageUser extends scheduleSignalElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  @state()
    user?: Projects.Hami.SignInResponse;

  override connectedCallback() {
    super.connectedCallback();

    requireSignIn({ catchUrl: urlForName('Landing') });

    dispatch('top-app-bar-hidden', false);
    dispatch('bottom-app-bar-hidden', false);

    this.addSignalListener('user', (value) => {
      this.user = value;
    });
  }

  override render(): RenderResult {
    super.render();

    if (this.user == null) return nothing;

    return this.renderUserInformationCard();
  }

  private renderUserInformationCard(): RenderResult {
    if (this.user == null) return nothing;

    const userInformationListTemplate = [
      M3.Renderers.renderListItem({
        component: 'list-item',
        type: 'list-item',
        headline: [
          this.user.gender != null ? i18n.message(this.user.gender) : '',
          this.user.firstName,
          this.user.lastName,
          `(${i18n.message(this.user.role)})`,
        ].join(' '),
        slotList: [
          {
            component: 'icon',
            type: 'svg',
            slot: 'start',
            SVG: IconPersonOutlineRounded,
          },
        ],
      }),
      M3.Renderers.renderListItem({
        component: 'list-item',
        type: 'list-item',
        headline: `${i18n.phoneNumber(this.user.phoneNumber)}`,
        slotList: [
          {
            component: 'icon',
            type: 'svg',
            slot: 'start',
            SVG: IconCallOutlineRounded,
          },
        ],
      }),
      this.renderInformationCardEmailItem(),
      M3.Renderers.renderListItem({
        component: 'list-item',
        type: 'list-item',
        headline: `${i18n
          .message('user_information_box_score_title')
          .replace('{{score}}', i18n.numberFormat(this.user.score))}`,
        classes: ['icon-gold'],
        slotList: [
          {
            component: 'icon',
            type: 'svg',
            slot: 'start',
            SVG: IconAwardStarRounded,
          },
        ],
      }),
    ];

    return html`
      <div class="card-box">
        <h3 class="title">${i18n.message('user_information_box_title')}</h3>

        <surface-card type="elevated">
          <md-list>${userInformationListTemplate}</md-list>
          
          <div class="buttons-list">${this.renderButtonsList()}</div>
        </surface-md>
      </div>
    `;
  }

  private renderInformationCardEmailItem():
    | M3.Types.ItemRendererReturn
    | undefined {
    if (this.user?.email != null) {
      return M3.Renderers.renderListItem({
        component: 'list-item',
        type: 'list-item',
        headline: `${this.user.email}`,
        slotList: [
          {
            component: 'icon',
            type: 'svg',
            slot: 'start',
            SVG: IconAlternateEmailRounded,
          },
        ],
      });
    }

    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  private renderButtonsList(): RenderResult {
    const buttonsListTemplate = [
      M3.Renderers.renderButton({
        component: 'button',
        type: 'tonal',
        label: i18n.message('user_information_box_add_score_button_label'),
        hasIcon: true,
        trailingIcon: true,
        slotList: [
          {
            component: 'icon',
            type: 'svg',
            SVG: IconStarOutlineRounded,
            slot: 'icon',
          },
        ],
      }),
      M3.Renderers.renderButton({
        component: 'button',
        type: 'tonal',
        label: i18n.message(
          'user_information_box_change_password_button_label'
        ),
        hasIcon: true,
        trailingIcon: true,
        slotList: [
          {
            component: 'icon',
            type: 'svg',
            SVG: IconLockOutline,
            slot: 'icon',
          },
        ],
      }),
    ];

    return html`${buttonsListTemplate}`;
  }
}
