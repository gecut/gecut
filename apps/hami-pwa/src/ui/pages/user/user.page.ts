import { PageBase } from '#hami/ui/helpers/page-base';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { M3 } from '@gecut/ui-kit';
import { sanitizer } from '@gecut/utilities';
import { html, nothing, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import styles from './user.page.scss?inline';

import type { RenderResult, Projects } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-user': PageUser;
  }
}

@customElement('page-user')
export class PageUser extends PageBase {
  static override styles = [unsafeCSS(styles), ...PageBase.styles];

  @state()
    user?: Projects.Hami.SignInResponse;

  override connectedCallback() {
    super.connectedCallback();

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
        <h3 class="title">${i18n.msg('user')}</h3>

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
      children: [
        {
          component: 'list',
          type: 'list',
          children: [
            {
              component: 'list-item',
              type: 'list-item',
              attributes: {
                headline: [
                  this.user.gender != null ? i18n.msg(this.user.gender) : '',
                  this.user.firstName,
                  this.user.lastName,
                  `(${i18n.msg(this.user.role)})`,
                ].join(' '),
              },
              children: [
                {
                  component: 'icon',
                  type: 'svg',
                  attributes: { slot: 'start' },
                  SVG: icons.outlineRounded.person,
                },
              ],
            },
            {
              component: 'list-item',
              type: 'list-item',
              attributes: {
                headline: `${i18n.phone(sanitizer.str(this.user.phoneNumber))}`,
              },
              children: [
                {
                  component: 'icon',
                  type: 'svg',
                  attributes: { slot: 'start' },
                  SVG: icons.outlineRounded.call,
                },
              ],
            },
            {
              component: 'list-item',
              type: 'list-item',
              attributes: {
                headline: `${this.user.email}`,
                hidden: this.user.email == null,
              },
              children: [
                {
                  component: 'icon',
                  type: 'svg',
                  attributes: { slot: 'start' },
                  SVG: icons.filledRounded.alternateEmail,
                },
              ],
            },
            {
              component: 'list-item',
              type: 'list-item',
              attributes: {
                headline: i18n.msg('your-score', i18n.int(this.user.score)),
              },
              children: [
                {
                  component: 'icon',
                  type: 'svg',
                  attributes: { slot: 'start', classes: ['icon-gold'] },
                  SVG: icons.filledRounded.awardStar,
                },
              ],
            },
            { component: 'divider', type: 'divider' },
            {
              component: 'division',
              type: 'div',
              attributes: { classes: ['buttons-list'] },
              children: [
                {
                  component: 'button',
                  type: 'tonal',
                  attributes: { hasIcon: true, trailingIcon: true },
                  children: [
                    i18n.msg('add-score'),
                    {
                      component: 'icon',
                      type: 'svg',
                      SVG: icons.filledRounded.add,
                      attributes: { slot: 'icon' },
                    },
                  ],
                },
                {
                  component: 'button',
                  type: 'tonal',
                  attributes: { hasIcon: true, trailingIcon: true },
                  children: [
                    i18n.msg('change-password'),
                    {
                      component: 'icon',
                      type: 'svg',
                      SVG: icons.outline.lock,
                      attributes: { slot: 'icon' },
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
