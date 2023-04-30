import type { TemplateResult } from 'lit';

export type IconButtonContent = {
  icon: TemplateResult;
  href?: string;
  target?: string;
  disabled?: boolean;
  flipIconInRtl?: boolean;
};
