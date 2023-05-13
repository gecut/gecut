import '@gecut/form-builder';

import IconCallOutlineRounded from 'virtual:icons/material-symbols/call-outline-rounded';
import IconPasswordOutline from 'virtual:icons/material-symbols/lock-outline';

const form = document.createElement('form-builder');
const formBox = document.querySelector<HTMLFormElement>('.form');
const result = document.querySelector<HTMLPreElement>('.result');

form.data = {
  slides: {
    slide1: [
      {
        component: 'text-field',
        type: 'filled',
        inputType: 'text',
        label: 'Label',
        name: 'Name1',
      },
      [
        {
          component: 'text-field',
          type: 'filled',
          inputType: 'text',
          label: 'Label',
          name: 'Name2',
        },
        {
          component: 'text-field',
          type: 'filled',
          inputType: 'text',
          label: 'Label',
          name: 'Name3',
        },
      ],
      {
        component: 'button',
        type: 'filled',

        label: 'Next Slide',

        action: 'next_slide',
      },
    ],
    slide2: [
      {
        component: 'text-field',
        type: 'filled',
        inputType: 'email',
        label: 'Email',
        name: 'email',
        leadingIconSVG: IconCallOutlineRounded,
        hasLeadingIcon: true,
        trailingIconSVG: IconPasswordOutline,
        hasTrailingIcon: true,
        validator: [
          {
            rule: 'email',
            errorMessage: 'email not valid',
          },
        ],
      },
      [
        {
          component: 'text-field',
          type: 'filled',
          inputType: 'text',
          label: 'Label',
          name: 'Name5',
        },
        {
          component: 'text-field',
          type: 'filled',
          inputType: 'text',
          label: 'Label',
          name: 'Name6',
        },
      ],
      [
        {
          component: 'button',
          type: 'filled',

          label: 'Previous Slide',

          action: 'previous_slide',

          customConfig(target) {
            target.style.flexGrow = '0';
            
            return target;
          },
        },
        {
          component: 'button',
          type: 'filled',

          label: 'Form Submit',

          action: 'form_submit',
        },
      ],
    ],
  },
};

form.addEventListener('change', (event) => {
  console.log({ validate: form.validate }, event, form);

  if (result != null) {
    result.innerHTML = JSON.stringify(form.values, null, 2);
  }
});

// form.activeSlide = 'slide2';

formBox?.appendChild(form);
