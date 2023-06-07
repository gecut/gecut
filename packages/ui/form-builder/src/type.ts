import type { Rules } from '@gecut/form-validator';
import type { SingleOrArray } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export type FormTextFieldContent = M3.Types.TextFieldContent & {
  validator?: Rules;
};
export type FormButtonContent = M3.Types.ButtonContent & {
  disabled?: boolean | 'validate' | ((form: Form, slide: FormSlide) => boolean);
  action?: 'next_slide' | 'previous_slide' | 'form_submit';
};

export type FormComponent = FormTextFieldContent | FormButtonContent;
export type FormRow = SingleOrArray<FormComponent>;
export type FormSlide = Array<FormRow>;
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
