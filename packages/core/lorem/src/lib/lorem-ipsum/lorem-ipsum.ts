import { loremIpsum } from '../../content.json';
import { generateText } from '../generate-text/generate-text';

import type { LoremIpsumOptions, LoremIpsumParameters } from './type';

const requireParameters = (
  _options: LoremIpsumParameters
): LoremIpsumOptions => {
  return {
    lang: 'en',
    size: 1,
    sizeType: 'paragraph',

    ..._options,
  };
};

export const loremIpsumGenerator = (_options: LoremIpsumParameters): string => {
  const options = requireParameters(_options);
  const content = loremIpsum[options.lang] as string;

  switch (options.sizeType) {
  case 'paragraph':
    return content.repeat(options.size);
  case 'sentence':
    return generateText(content.split(/[.،,]{1}/g), options.size);
  case 'word':
    return generateText(content.split(' '), options.size);
  }
};
