import { requiredValidator } from './validator';

import type { RequiredRule } from './validator';

const rules: RequiredRule = {
  rule: 'required',
  errorMessage: 'Error Message',
};

describe('Required Validator', () => {
  test("Return 'true' To My Name", () => {
    expect(requiredValidator('MohammadMahdi Zamanian', rules)).toEqual(true);
  });

  test("Return 'false' To Empty", () => {
    expect(requiredValidator('', rules)).toEqual(false);
  });
});
