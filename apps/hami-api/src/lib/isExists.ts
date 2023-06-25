export function isFieldExits(...values: (string | null | undefined)[]) {
  return values
    .map((value) => _isFieldExits(value))
    .reduce((p, c) => p || c, false);
}
function _isFieldExits(value: string | null | undefined): boolean {
  value = (value ?? '').trim();

  const isExists = !(value === '' || value.indexOf('no') === 0);

  if (isExists === true) return false;

  return true;
}
