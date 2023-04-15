export const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const emailValidate = (tel: string): boolean => regex.test(tel);
