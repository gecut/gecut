import { defaultValidators } from '#hami/controllers/default-validators';

import i18n from '@gecut/i18n';

import type { M3 } from '@gecut/ui-kit';

const type = 'outlined';

export const addProjectForm: M3.Types.FormBuilderContent & {
  slot?: 'header' | 'footer' | undefined;
} = {
  component: 'form-builder',
  type: 'form-builder',
  data: {
    slides: {
      project: [
        {
          component: 'text-field',
          type,
          inputType: 'text',
          name: 'projectName',
          label: i18n.msg('add_project_dialog_project_name'),
          validator: [defaultValidators.required],
        },
        {
          component: 'text-field',
          type,
          inputType: 'text',
          name: 'projectAddress',
          label: i18n.msg('add_project_dialog_project_address'),
          validator: [defaultValidators.required],
        },
        {
          component: 'text-field',
          type,
          inputType: 'text',
          name: 'superVisorName',
          label: i18n.msg('add_project_dialog_supervisor_name'),
          validator: [defaultValidators.required],
        },
        {
          component: 'text-field',
          type,
          inputType: 'tel',
          name: 'superVisorPhoneNumber',
          label: i18n.msg('add_project_dialog_supervisor_phone_number'),
          validator: [defaultValidators.required, defaultValidators.phone],
        },
      ],
    },
  },
  activeSlide: 'project',
};
