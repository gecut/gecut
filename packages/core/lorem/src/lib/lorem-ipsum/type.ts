import type {Languages, SizeType} from '../type';

export type LoremIpsumOptions = {
  lang: Languages[number];
  sizeType: SizeType[number];
  size: number;
};

export type LoremIpsumParameters = Partial<LoremIpsumOptions>;