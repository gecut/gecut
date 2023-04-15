export const regex = /^(09)([0-9]{9})$/;

export const telValidate = (tel: string): boolean => regex.test(tel);
