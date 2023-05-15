import type { AlwatrDocumentObjectActive } from './document-object-active.js';

export interface Product extends AlwatrDocumentObjectActive {
  code: string;
  name: string;
  unit: string;
  category: string;
  brand: string;
  description: string;
}
