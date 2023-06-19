export function isFieldExits(value: string) {
  value = value.trim();

  if (value === '' || value.indexOf('no') === 0) return false;

  return true;
}
