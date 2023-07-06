export function join(
    separator = ' ',
    ...values: Array<string | undefined | null>
): string {
  return values.join(separator);
}
