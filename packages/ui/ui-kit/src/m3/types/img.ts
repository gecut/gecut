import type { BaseContent } from './base/base-content';

export type IMGRendererReturn = HTMLImageElement;

export interface IMGContent extends BaseContent<IMGRendererReturn> {
  component: 'img';
  type: 'img';

  src: string;
  alt: string;
}
