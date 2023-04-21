import '@gecut/form-builder';

const form = document.createElement('form-builder');

form.data = {
  components: [
    {
      name: 'text',
      label: 'text',
      type: 'text',
      ui: 'filled',
    },
    [
      {
        name: 'text',
        label: 'text',
        type: 'text',
        ui: 'filled',
      },
      {
        name: 'text',
        label: 'text',
        type: 'text',
        ui: 'filled',
      },
    ],
  ],
};

document.body.appendChild(form);
