import type { EmailRule } from './type';
import type { ValidatorFunction } from '../../type';

export type * from './type';

const emailValidatorRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const emailValidator: ValidatorFunction<EmailRule> = (
    value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ruleData
) => {
  value = String(value).trim();

  return value == '' || emailValidatorRegex.test(value);
};
