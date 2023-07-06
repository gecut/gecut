import type { RequiredRule } from './type';
import type { ValidatorFunction } from '../../type';

export type * from './type';

export const requiredValidator: ValidatorFunction<RequiredRule> = (
    value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ruleData
) => {
  value = String(value).trim();

  return value != '';
};
