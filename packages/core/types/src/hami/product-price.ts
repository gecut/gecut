import type { AlwatrDocumentObjectActive } from './document-object-active.js';
import type { RequireFunc } from './require-functions.js';

export interface ProductPrice extends AlwatrDocumentObjectActive {
  name: string;
  minPrice: number;
  normalPrice: number;
}

export const productPriceRequire: RequireFunc<ProductPrice> = (
  productPrice: Partial<ProductPrice>
): ProductPrice => ({
  id: 'auto_increment',
  name: 'no-name',
  minPrice: 0,
  normalPrice: 0,
  active: true,

  ...productPrice,
});
