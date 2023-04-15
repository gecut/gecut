import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import '@material/web/button/filled-button';
import '@material/web/button/outlined-button';
import '@material/web/button/text-button';
import '@material/web/button/elevated-button';
import '@material/web/button/tonal-button';

import type { RenderResult } from '@gecut/types';
import type { Button, Form } from '../type';

export default function button(component: Button, form: Form): RenderResult {
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
          @click=${event('click', component, form)}
        ></md-filled-button>
      `;
    case 'outlined':
      return html`
        <md-outlined-button
          label=${component.label}
          class=${classes}
          ?disabled=${component.disabled ?? false}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, form)}
        ></md-outlined-button>
      `;
    case 'text':
      return html`
        <md-text-button
          label=${component.label}
          class=${classes}
          ?disabled=${component.disabled ?? false}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, form)}
        ></md-text-button>
      `;
    case 'elevated':
      return html`
        <md-elevated-button
          label=${component.label}
          class=${classes}
          ?disabled=${component.disabled ?? false}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, form)}
        ></md-elevated-button>
      `;
    case 'tonal':
      return html`
        <md-tonal-button
          label=${component.label}
          class=${classes}
          ?disabled=${component.disabled ?? false}
          ?trailingIcon=${component.trailingIcon ?? false}
          @click=${event('click', component, form)}
        ></md-tonal-button>
      `;
  }
}

function event(
    eventName: 'click',
    component: Button,
    form: Form
): (event: PointerEvent) => void {
  return (event: PointerEvent) => {
    if (form?.listener != null) {
      form.listener(component, eventName, event);
    }
  };
}
