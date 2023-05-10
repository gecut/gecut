import { html } from 'lit';

import '@material/web/button/elevated-button';
import '@material/web/button/filled-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';
import '@material/web/button/tonal-button';

import type { RenderResult } from '@gecut/types';
import type { ButtonContent } from '../types/button';

export function renderButton(content: ButtonContent): RenderResult {
  switch (content.type) {
    case 'elevated':
      return html`
        <md-elevated-button
          .href=${content.href}
          .target=${content.target}
          ?disabled=${content.disabled}
          ?trailingIcon=${content.trailingIcon}
          ?hasIcon=${content.hasIcon}
          ?preventClickDefault=${content.preventClickDefault}
        ></md-elevated-button>
      `;
    case 'filled':
      return html`
        <md-filled-button
          .href=${content.href}
          .target=${content.target}
          ?disabled=${content.disabled}
          ?trailingIcon=${content.trailingIcon}
          ?hasIcon=${content.hasIcon}
          ?preventClickDefault=${content.preventClickDefault}
        ></md-filled-button>
      `;
    case 'outlined':
      return html`
        <md-outlined-button
          .href=${content.href}
          .target=${content.target}
          ?disabled=${content.disabled}
          ?trailingIcon=${content.trailingIcon}
          ?hasIcon=${content.hasIcon}
          ?preventClickDefault=${content.preventClickDefault}
        ></md-outlined-button>
      `;
    case 'text':
      return html`
        <md-text-button
          .href=${content.href}
          .target=${content.target}
          ?disabled=${content.disabled}
          ?trailingIcon=${content.trailingIcon}
          ?hasIcon=${content.hasIcon}
          ?preventClickDefault=${content.preventClickDefault}
        ></md-text-button>
      `;
    case 'tonal':
      return html`
        <md-tonal-button
          .href=${content.href}
          .target=${content.target}
          ?disabled=${content.disabled}
          ?trailingIcon=${content.trailingIcon}
          ?hasIcon=${content.hasIcon}
          ?preventClickDefault=${content.preventClickDefault}
        ></md-tonal-button>
      `;
  }
}
