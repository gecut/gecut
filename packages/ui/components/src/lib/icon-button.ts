import { html } from 'lit';

import '@material/web/iconbutton/standard-icon-button';
import '@material/web/iconbutton/outlined-icon-button';
import '@material/web/iconbutton/filled-icon-button';
import '@material/web/iconbutton/filled-tonal-icon-button';

import type { IconButtonContent } from '../types/icon-button';
import type { RenderResult } from '@gecut/types';

export function renderIconButton(content: IconButtonContent): RenderResult {
  switch (content.type) {
    case 'standard':
      return html`
        <md-standard-icon-button
          .href=${content.href}
          .target=${content.target}
          ?disabled=${content.disabled}
          ?flipIconInRtl=${content.flipIconInRtl}
          ?toggle=${content.toggle}
          ?selected=${content.selected}
        ></md-standard-icon-button>
      `;
    case 'outlined':
      return html`
        <md-outlined-icon-button
          .href=${content.href}
          .target=${content.target}
          ?disabled=${content.disabled}
          ?flipIconInRtl=${content.flipIconInRtl}
          ?toggle=${content.toggle}
          ?selected=${content.selected}
        ></md-outlined-icon-button>
      `;
    case 'filled':
      return html`
        <md-filled-icon-button
          .href=${content.href}
          .target=${content.target}
          ?disabled=${content.disabled}
          ?flipIconInRtl=${content.flipIconInRtl}
          ?toggle=${content.toggle}
          ?selected=${content.selected}
        ></md-filled-icon-button>
      `;
    case 'filled-tonal':
      return html`
        <md-filled-tonal-icon-button
          .href=${content.href}
          .target=${content.target}
          ?disabled=${content.disabled}
          ?flipIconInRtl=${content.flipIconInRtl}
          ?toggle=${content.toggle}
          ?selected=${content.selected}
        ></md-filled-tonal-icon-button>
      `;
  }
}
