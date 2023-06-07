import { phoneValidator } from './validator';

import type { PhoneRule } from './validator';

const rules: PhoneRule = {
  rule: 'phone',
  country: 'IR',
  errorMessage: 'Error Message',
};

describe('Phone Validator', () => {
  test("Return 'true' To My Number", () => {
    expect(phoneValidator('09155595488', rules)).toEqual(true);
  });

  test("Return 'true' To Starting With 09 And 123", () => {
    expect(phoneValidator('09123456789', rules)).toEqual(true);
  });

  test("Return 'true' To Empty", () => {
    expect(phoneValidator('', rules)).toEqual(true);
  });

  test("Return 'false' To Starting With Other Than 09", () => {
    expect(phoneValidator('08155595488', rules)).toEqual(false);
  });

  test("Return 'false' To More Than 11 Digits", () => {
    expect(phoneValidator('091555954888', rules)).toEqual(false);
  });

  test("Return 'false' To Less Than 11 Digits", () => {
    expect(phoneValidator('0915559548', rules)).toEqual(false);
  });
});
