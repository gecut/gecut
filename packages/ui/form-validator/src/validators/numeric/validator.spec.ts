import { numericValidator } from './validator';

import type { NumericRule } from './validator';

const rules: NumericRule = {
  rule: 'numeric',
  errorMessage: 'Error Message',
};

describe('Phone Validator', () => {
  test('Return \'true\' To My Number', () => {
    expect(numericValidator('09155595488', rules)).toEqual(true);
  });

  test('Return \'true\' To Empty', () => {
    expect(numericValidator('', rules)).toEqual(true);
  });

  test('Return \'false\' To My Name', () => {
    expect(numericValidator('MohammadMahdi Zamanian', rules)).toEqual(false);
  });
});
