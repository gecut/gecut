/**
 * The function adds square brackets to the beginning and end of a string if they are not already
 * present.
 * @param {string} scopeName - The parameter `scopeName` is a string representing the name of a scope.
 * @returns The function `stabilizerScopeName` returns a string.
 */
export function stabilizerScopeName(scopeName: string): string {
  scopeName = scopeName.trim();

  const first = scopeName.charAt(0);
  if (first !== '[' && first !== '{' && first !== '<') {
    scopeName = `[${scopeName}]`;
  }

  return scopeName;
}
