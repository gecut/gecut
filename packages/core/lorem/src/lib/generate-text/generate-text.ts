import { generateArrayFromSize } from './array-size';

export const generateText = (
    array: string[],
    size: number,
    join = ' '
): string => {
  array = generateArrayFromSize(array, size);

  return array.join(join);
};
