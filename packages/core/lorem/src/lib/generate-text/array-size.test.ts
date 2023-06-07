import { generateArrayFromSize } from './array-size';

test('generateArrayFromSize.length', () => {
  expect(generateArrayFromSize(['1'], 5).length).toBe(5);
});
