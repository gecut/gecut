import type { ValidatorFunction } from '../../type';
import type { EmailRule } from './type';

export * from './type';

const emailValidatorRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const emailValidator: ValidatorFunction<EmailRule> = (
    value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ruleData
) => {
  value = String(value).trim();

  return value == '' || emailValidatorRegex.test(value);
};
