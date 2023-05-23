import type { AlwatrDocumentObjectActive } from './document-object-active.js';
import type { RequireFunc } from './require-functions.js';


export interface Product extends AlwatrDocumentObjectActive {
  code: string;
  name: string;
  unit: string;
  category: string;
  brand: string;
  description: string;
}

export const productRequire: RequireFunc<Product> = (
  product: Partial<Product>
): Product => ({
  id: 'auto_increment',
  code: 'no-code',
  name: 'no-name',
  unit: 'no-unit',
  brand: 'no-brand',
  category: 'no-category',
  description: 'no-description',
  active: true,

  ...product,
});
