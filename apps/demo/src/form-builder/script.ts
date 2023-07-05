import '@gecut/form-builder';

const form = document.createElement('form-builder');
const formBox = document.querySelector<HTMLFormElement>('.form');
const result = document.querySelector<HTMLPreElement>('.result');

form.data = {
  slides: {
    slide1: [
      {
        component: 'text-field',
        type: 'filled',
        attributes: { inputType: 'text', label: 'Label', name: 'Name1' },
      },
      [
        {
          component: 'text-field',
          type: 'filled',
          attributes: { inputType: 'text', label: 'Label', name: 'Name2' },
        },
        {
          component: 'text-field',
          type: 'filled',
          attributes: { inputType: 'text', label: 'Label', name: 'Name3' },
        },
      ],
      {
        component: 'button',
        type: 'filled',

        children: ['Next Slide'],

        action: 'next_slide',
      },
    ],
    slide2: [
      {
        component: 'text-field',
        type: 'filled',
        attributes: { inputType: 'email', label: 'Email', name: 'email' },
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
          attributes: { inputType: 'text', label: 'Label', name: 'Name5' },
        },
        {
          component: 'text-field',
          type: 'filled',
          attributes: { inputType: 'text', label: 'Label', name: 'Name6' },
        },
      ],
      [
        {
          component: 'button',
          type: 'filled',

          children: ['Previous Slide'],

          action: 'previous_slide',
          attributes: { styles: { 'flex-grow': '0' } },
        },
        {
          component: 'button',
          type: 'filled',

          children: ['Form Submit'],

          action: 'form_submit',
        },
      ],
    ],
  },
};

form.addEventListener('change', (event) => {
  if (result != null) {
    result.innerHTML = JSON.stringify(form.values, null, 2);
  }
});

// form.activeSlide = 'slide2';

formBox?.appendChild(form);
