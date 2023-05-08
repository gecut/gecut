import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { when } from 'lit/directives/when.js';

import '@material/web/button/filled-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';
import '@material/web/button/elevated-button';
import '@material/web/button/tonal-button';
import '@material/web/icon/icon';

import type { RenderResult } from '@gecut/types';
import type { Button, Form, FormListener } from '../type';

export default function button(
    form: Form,
    component: Button,
    listener: FormListener
): RenderResult {
  const classes = classMap({
    button: true,
    'grow-button': component.grow === true,
    [`${component.type}-button`]: true,
    [`${component.ui}-button`]: true,
    [`${component.align ?? 'center'}-button`]: true,
  });

  switch (component.ui) {
    case 'filled':
      return html`
        <md-filled-button
          class=${classes}
          ?disabled=${buttonDisabled(component.disabled ?? false, form.valid)}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, listener)}
        >
          <span class="button-label">${component.label}</span>
          ${when(
            component.iconSVG != null,
            () => html`
              <md-icon slot="icon"> ${unsafeSVG(component.iconSVG)} </md-icon>
            `
          )}
        </md-filled-button>
      `;
    case 'outlined':
      return html`
        <md-outlined-button
          class=${classes}
          ?disabled=${buttonDisabled(component.disabled ?? false, form.valid)}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, listener)}
        >
          <span class="button-label">${component.label}</span>
          ${when(
            component.iconSVG != null,
            () => html`
              <md-icon slot="icon"> ${unsafeSVG(component.iconSVG)} </md-icon>
            `
          )}
        </md-outlined-button>
      `;
    case 'text':
      return html`
        <md-text-button
          class=${classes}
          ?disabled=${buttonDisabled(component.disabled ?? false, form.valid)}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, listener)}
        >
          <span class="button-label">${component.label}</span>
          ${when(
            component.iconSVG != null,
            () => html`
              <md-icon slot="icon"> ${unsafeSVG(component.iconSVG)} </md-icon>
            `
          )}
        </md-text-button>
      `;
    case 'elevated':
      return html`
        <md-elevated-button
          class=${classes}
          ?disabled=${buttonDisabled(component.disabled ?? false, form.valid)}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, listener)}
        >
          <span class="button-label">${component.label}</span>
          ${when(
            component.iconSVG != null,
            () => html`
              <md-icon slot="icon"> ${unsafeSVG(component.iconSVG)} </md-icon>
            `
          )}
        </md-elevated-button>
      `;
    case 'tonal':
      return html`
        <md-tonal-button
          class=${classes}
          ?disabled=${buttonDisabled(component.disabled ?? false, form.valid)}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, listener)}
        >
          <span class="button-label">${component.label}</span>
          ${when(
            component.iconSVG != null,
            () => html`
              <md-icon slot="icon"> ${unsafeSVG(component.iconSVG)} </md-icon>
            `
          )}
        </md-tonal-button>
      `;
  }
}

function buttonDisabled(disabled: boolean | 'by_valid', valid: boolean) {
  if (disabled === 'by_valid') {
    return !valid;
  }

  return disabled;
}

function event(
    eventName: 'click',
    component: Button,
    listener: FormListener
): (event: PointerEvent) => void {
  return (event: PointerEvent) => {
    listener(component, eventName, event);
  };
}
