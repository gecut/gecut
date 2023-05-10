import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { ifDefined } from 'lit/directives/if-defined.js';

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
          slot=${ifDefined(content.slot)}
        >
          ${unsafeSVG(content.icon.SVG)}
        </md-standard-icon-button>
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
          slot=${ifDefined(content.slot)}
        >
          ${unsafeSVG(content.icon.SVG)}
        </md-outlined-icon-button>
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
          slot=${ifDefined(content.slot)}
        >
          ${unsafeSVG(content.icon.SVG)}
        </md-filled-icon-button>
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
          slot=${ifDefined(content.slot)}
        >
          ${unsafeSVG(content.icon.SVG)}
        </md-filled-tonal-icon-button>
      `;
  }
}
