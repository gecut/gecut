import { typographyStyles } from '../types/typography';

import { createElementByContent } from './base/base-renderer';

import type {
  TypoGraphyContent,
  TypoGraphyRendererReturn,
  TypoGraphyStylesProperties,
} from '../types/typography';

export function renderTypoGraphy(
  content: TypoGraphyContent
): TypoGraphyRendererReturn {
  const typography = createElementByContent(content.type, content, []);

  if (content.style != null) {
    typography.style.marginTop = '.6em';
    typography.style.marginBottom = '.6em';

    const selectedStyle = typographyStyles[content.style];

    for (const property of Object.keys(selectedStyle)) {
      const _prop = property as TypoGraphyStylesProperties;

      typography.style[_prop] = selectedStyle[_prop];
    }
  }

  return typography;
}
