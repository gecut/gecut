import '@gecut/form-builder';

const form = document.createElement('form-builder');
const formBox = document.querySelector<HTMLFormElement>('.form');
const result = document.querySelector<HTMLPreElement>('.result');

const listener = () => {
  if (result != null) {
    result.innerHTML = JSON.stringify(form.data, null, 4);
  }
};

form.data = {
  components: [
    [
      {
        name: 'first-name',
        label: 'First Name',
        type: 'text',
        ui: 'filled',
      },
      {
        name: 'last-name',
        label: 'Last Name',
        type: 'text',
        ui: 'filled',
      },
    ],
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      ui: 'filled',
      validate: [
        {
          rule: 'email',
          errorMessage: 'email error message',
        },
      ],
    },
    {
      name: 'tel',
      label: 'Phone Number',
      type: 'tel',
      ui: 'filled',
      minLength: 11,
      maxLength: 11,
      validate: [
        {
          rule: 'required',
          errorMessage: 'required',
        },
        {
          rule: 'numeric',
          errorMessage: 'must numeric',
        },
        {
          rule: 'phone',
          country: 'IR',
          errorMessage: 'phone number error message',
        },
      ],
    },
    [
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        ui: 'filled',
      },
      {
        name: 'confirm-password',
        label: 'Confirm Password',
        type: 'password',
        ui: 'filled',
      },
    ],
    {
      type: 'submit',
      label: 'Submit',
      ui: 'filled',
      align: 'end',
    },
  ],
  listener,
};

formBox?.appendChild(form);

listener();
