import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@material/web/icon/icon';

import type { IconContent } from '../types/icon';
import type { RenderResult } from '@gecut/types';

export function renderIcon(content: IconContent): RenderResult {
  return html`<md-icon slot=${ifDefined(content.slot)}>${unsafeSVG(content.SVG)}</md-icon>`;
}
