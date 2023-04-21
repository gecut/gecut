import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import '@material/web/button/filled-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';
import '@material/web/button/elevated-button';
import '@material/web/button/tonal-button';

import type { RenderResult } from '@gecut/types';
import type { Button, FormListener } from '../type';

export default function button(
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
          label=${component.label}
          class=${classes}
          ?disabled=${component.disabled ?? false}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, listener)}
        ></md-filled-button>
      `;
    case 'outlined':
      return html`
        <md-outlined-button
          label=${component.label}
          class=${classes}
          ?disabled=${component.disabled ?? false}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, listener)}
        ></md-outlined-button>
      `;
    case 'text':
      return html`
        <md-text-button
          label=${component.label}
          class=${classes}
          ?disabled=${component.disabled ?? false}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, listener)}
        ></md-text-button>
      `;
    case 'elevated':
      return html`
        <md-elevated-button
          label=${component.label}
          class=${classes}
          ?disabled=${component.disabled ?? false}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, listener)}
        ></md-elevated-button>
      `;
    case 'tonal':
      return html`
        <md-tonal-button
          label=${component.label}
          class=${classes}
          ?disabled=${component.disabled ?? false}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, listener)}
        ></md-tonal-button>
      `;
  }
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
