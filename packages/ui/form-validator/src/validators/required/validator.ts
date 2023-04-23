import type { ValidatorFunction } from '../../type';
import type { RequiredRule } from './type';

export * from './type';

export const requiredValidator: ValidatorFunction<RequiredRule> = (
    value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ruleData
) => {
  value = String(value).trim();

  return value != '';
};
