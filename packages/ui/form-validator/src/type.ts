import type { EmailRule } from './validators/email/type';
import type { NumericRule } from './validators/numeric/type';
import type { PhoneRule } from './validators/phone/type';
import type { RequiredRule } from './validators/required/type';
import type { Stringifyable, ArrayValues } from '@gecut/types';

export type Rules = Array<PhoneRule | EmailRule | NumericRule | RequiredRule>;

export type ValidatorFunction<T extends ArrayValues<Rules>> = (
  value: Stringifyable,
  options: T
) => boolean;
