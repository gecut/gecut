import type { NumericRule } from './type';
import type { ValidatorFunction } from '../../type';

export type * from './type';

const numericValidatorRegex = /^-?\d+$/;

export const numericValidator: ValidatorFunction<NumericRule> = (
  value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ruleData
) => {
  value = String(value).trim();

  return value == '' || numericValidatorRegex.test(value);
};
