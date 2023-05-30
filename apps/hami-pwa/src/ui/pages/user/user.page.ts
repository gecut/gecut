import { requireSignIn } from '#hami/controllers/require-sign-in';
import i18n from '#hami/ui/i18n';
import { urlForName } from '#hami/ui/router';
import elementStyle from '#hami/ui/stylesheets/element.scss?inline';
import pageStyle from '#hami/ui/stylesheets/page.scss?inline';

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

    return html`
      <div class="card-box">
        <h3 class="title">${i18n.message('user_information_box_title')}</h3>

        ${this.renderUserInformationCardElement()}
      </div>
    `;
  }

  private renderUserInformationCardElement():
    | M3.Components.SurfaceCard
    | typeof nothing {
    if (this.user == null) return nothing;

    return M3.Renderers.renderSurfaceCard({
      component: 'surface-card',
      type: 'elevated',
      slotList: [
        {
          component: 'list',
          type: '',
          slotList: [
            {
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
            },
            {
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
            },
            {
              component: 'list-item',
              type: 'list-item',
              headline: `${this.user.email}`,
              hidden: this.user.email == null,
              slotList: [
                {
                  component: 'icon',
                  type: 'svg',
                  slot: 'start',
                  SVG: IconAlternateEmailRounded,
                },
              ],
            },
            {
              component: 'list-item',
              type: 'list-item',
              headline: `${i18n
                .message('user_information_box_score_title')
                .replace('{{score}}', i18n.numberFormat(this.user.score))}`,
              slotList: [
                {
                  component: 'icon',
                  type: 'svg',
                  slot: 'start',
                  SVG: IconAwardStarRounded,
                  classes: ['icon-gold'],
                },
              ],
            },
            { component: 'divider', type: 'divider' },
            {
              component: 'division',
              type: 'div',
              classes: ['buttons-list'],
              slotList: [
                {
                  component: 'button',
                  type: 'tonal',
                  label: i18n.message(
                    'user_information_box_add_score_button_label'
                  ),
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
                },
                {
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
                },
              ],
            },
          ],
        },
      ],
    });
  }
}
