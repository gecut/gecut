import type { Rules } from '@gecut/form-validator';
import type { ButtonContent, TextFieldContent } from '@gecut/components';
import type { SingleOrArray } from '@gecut/types';

export type FormComponent =
  | (TextFieldContent & { validator?: Rules })
  | (ButtonContent & {
      disabled?:
        | boolean
        | 'validate'
        | ((form: Form, slide: FormSlide) => boolean);
      action?: 'next_slide' | 'previous_slide' | 'form_submit';
    });
export type FormRow = SingleOrArray<FormComponent>;
export type FormSlide = FormRow[];
export type Form = {
  slides: Record<string, FormSlide>;
};

export type FormValues<TForm extends Form | undefined> = TForm extends Form
  ? {
      [TSlide in keyof TForm['slides']]: {
        [TComponent in keyof TForm['slides'][TSlide]]: TForm['slides'][TSlide][TComponent];
      };
    }
  : undefined;
