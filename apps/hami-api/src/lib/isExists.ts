export function isFieldExits(...values: (string | null | undefined)[]) {
  return values
    .map((value) => _isFieldExits(value))
    .reduce((p, c) => p || c, false);
}
function _isFieldExits(value: string | null | undefined): boolean {
  value = (value ?? '').trim();

  const isEmpty = value === '' || value.indexOf('no') === 0;

  if (isEmpty === true) return false;

  return true;
}
