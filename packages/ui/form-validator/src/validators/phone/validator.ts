import type { ValidatorFunction } from '../../type';
import type { PhoneRule } from './type';

export type * from './type';

const phoneValidatorRegexListByCountry: Record<PhoneRule['country'], RegExp> = {
  IR: /^(09)([0-9]{9})$/,
};

export const phoneValidator: ValidatorFunction<PhoneRule> = (
    value,
    ruleData
) => {
  value = String(value).trim();

  return (
    value == '' ||
    phoneValidatorRegexListByCountry[ruleData.country].test(value)
  );
};
