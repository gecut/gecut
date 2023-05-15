import { emailValidator } from './validator';

import type { EmailRule } from './validator';

const rules: EmailRule = {
  rule: 'email',
  errorMessage: 'Error Message',
};

describe('Email Validator', () => {
  test("Return 'true' To My Email", () => {
    expect(emailValidator('mm25zamanian@gmail.com', rules)).toEqual(true);
  });

  test("Return 'true' To Other Valid Email", () => {
    expect(emailValidator('info@mm25zamanian.ir', rules)).toEqual(true);
  });

  test("Return 'true' To Empty", () => {
    expect(emailValidator('', rules)).toEqual(true);
  });

  test("Return 'false' To 'abc123@$abc'", () => {
    expect(emailValidator('abc123@$abc', rules)).toEqual(false);
  });

  test("Return 'false' To Domain", () => {
    expect(emailValidator('mm25zamanian.ir', rules)).toEqual(false);
  });
});
