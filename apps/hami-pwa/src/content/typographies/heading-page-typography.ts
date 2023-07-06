import type { M3 } from '@gecut/ui-kit';

export function headingPageTypography(
    title: string,
    options?: Partial<M3.Types.TypoGraphyContent>
): M3.Types.TypoGraphyContent {
  return {
    component: 'typography',
    type: 'h1',
    children: [title],
    style: 'title-large',
    attributes: {
      styles: {
        color: 'var(--md-sys-color-surface-variant)',
      },
    },

    ...options,
  };
}
