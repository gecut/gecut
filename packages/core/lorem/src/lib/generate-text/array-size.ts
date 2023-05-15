/**
 * If the size is greater than the array length, concatenate the array with itself until the size is
 * reached, otherwise return the array sliced to the size.
 * @param {string[]} array - The array to be repeated
 * @param {number} size - The size of the array you want to generate.
 * @returns {string[]}
 */
export const generateArrayFromSize = (
  array: string[],
  size: number
): string[] => {
  if (size > array.length) {
    return array.concat(...generateArrayFromSize(array, size - array.length));
  }

  return array.slice(0, size);
};
