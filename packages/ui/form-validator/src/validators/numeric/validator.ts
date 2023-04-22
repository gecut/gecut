import type { ValidatorFunction } from '../../type';
import type { NumericRule } from './type';

export * from './type';

const numericValidatorRegex = /^-?\d+$/;

export const numericValidator: ValidatorFunction<NumericRule> = (
    value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ruleData
) => {
  value = String(value).trim();

  return value == '' || numericValidatorRegex.test(value);
};
