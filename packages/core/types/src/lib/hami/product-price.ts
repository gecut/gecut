import type {AlwatrDocumentObjectActive} from './document-object-active.js';

export interface ProductPrice extends AlwatrDocumentObjectActive {
  name: string;
  minPrice: number;
  normalPrice: string;
}
