import type { BaseContent } from './base/base-content';

export type IMGRendererReturn = HTMLImageElement;

export interface IMGContent
  extends BaseContent<
    IMGRendererReturn,
    {
      src: string;
      alt: string;
    }
  > {
  component: 'img';
  type: 'img';
}
