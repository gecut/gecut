import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@material/web/textfield/filled-text-field';
import '@material/web/textfield/outlined-text-field';

import { telValidate } from '../validators/tel';
import { emailValidate } from '../validators/email';

import type { TextField } from '@material/web/textfield/lib/text-field';
import type { RenderResult } from '@gecut/types';
import type { Form, Input } from '../type';

export default function textField(component: Input, form: Form): RenderResult {
  const classes = classMap({
    field: true,
    'text-field': true,
    [`${component.type}-field`]: true,
    [`${component.ui}-field`]: true,
  });

  switch (component.ui) {
    case 'filled':
      return html`
        <md-filled-text-field
          name=${component.name}
          type=${component.type}
          label=${component.label}
          class=${classes}
          placeholder=${ifDefined(component.placeholder)}
          supportingText=${ifDefined(component.supportingText)}
          textDirection=${ifDefined(component.textDirection)}
          role=${ifDefined(component.role)}
          max=${ifDefined(component.max)}
          maxLength=${ifDefined(component.maxLength)}
          min=${ifDefined(component.min)}
          minLength=${ifDefined(component.minLength)}
          value=${ifDefined(component.value)}
          defaultValue=${ifDefined(component.defaultValue)}
          errorText=${ifDefined(component.errorText)}
          prefixText=${ifDefined(component.prefixText)}
          suffixText=${ifDefined(component.suffixText)}
          pattern=${ifDefined(component.validate?.pattern)}
          step=${ifDefined(component.step)}
          ?disabled=${component.disabled ?? false}
          ?required=${component.validate?.required ?? false}
          ?readOnly=${component.readOnly ?? false}
          ?hasLeadingIcon=${component.hasLeadingIcon ?? false}
          ?hasTrailingIcon=${component.hasTrailingIcon ?? false}
          @input=${event('input', component, form)}
          @change=${event('change', component, form)}
        ></md-filled-text-field>
      `;
    case 'outlined':
      return html`
        <md-outlined-text-field
          name=${component.name}
          type=${component.type}
          label=${component.label}
          class=${classes}
          placeholder=${ifDefined(component.placeholder)}
          supportingText=${ifDefined(component.supportingText)}
          textDirection=${ifDefined(component.textDirection)}
          role=${ifDefined(component.role)}
          max=${ifDefined(component.max)}
          maxLength=${ifDefined(component.maxLength)}
          min=${ifDefined(component.min)}
          minLength=${ifDefined(component.minLength)}
          value=${ifDefined(component.value)}
          defaultValue=${ifDefined(component.defaultValue)}
          errorText=${ifDefined(component.errorText)}
          prefixText=${ifDefined(component.prefixText)}
          suffixText=${ifDefined(component.suffixText)}
          pattern=${ifDefined(component.validate?.pattern)}
          step=${ifDefined(component.step)}
          ?disabled=${component.disabled ?? false}
          ?required=${component.validate?.required ?? false}
          ?readOnly=${component.readOnly ?? false}
          ?hasLeadingIcon=${component.hasLeadingIcon ?? false}
          ?hasTrailingIcon=${component.hasTrailingIcon ?? false}
          @input=${event('input', component, form)}
          @change=${event('change', component, form)}
        ></md-outlined-text-field>
      `;
  }
}

function event(
    eventName: 'input' | 'change',
    component: Input,
    form: Form
): (event: InputEvent) => void {
  return (event: InputEvent) => {
    textFieldValidate(component, event);

    if (form?.listener != null) {
      form.listener(component, eventName, event);
    }
  };
}

function textFieldValidate(input: Input, event: InputEvent): void {
  const target = event.target as TextField;

  switch (input.type) {
    case 'tel':
      target.error = !telValidate(target.value);
      break;
    case 'email':
      target.error = !emailValidate(target.value);
      break;
  }
}
