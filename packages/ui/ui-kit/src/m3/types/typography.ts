import type { BaseContent } from './base/base-content';

export type TypoGraphyStylesKeys =
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'headline-large'
  | 'headline-medium'
  | 'headline-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small';
export type TypoGraphyStylesProperties =
  | 'fontFamily'
  | 'fontStyle'
  | 'fontWeight'
  | 'fontSize'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textTransform'
  | 'textDecoration';

export const typographyStyles: Record<
  TypoGraphyStylesKeys,
  Record<TypoGraphyStylesProperties, string>
> = {
  'display-large': {
    fontFamily: 'var(--md-sys-typescale-display-large-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-display-large-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-display-large-font-weight)',
    fontSize: 'var(--md-sys-typescale-display-large-font-size)',
    letterSpacing: 'var(--md-sys-typescale-display-large-tracking)',
    lineHeight: 'var(--md-sys-typescale-display-large-height)',
    textTransform: 'var(--md-sys-typescale-display-large-text-transform)',
    textDecoration: 'var(--md-sys-typescale-display-large-text-decoration)',
  },
  'display-medium': {
    fontFamily: 'var(--md-sys-typescale-display-medium-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-display-medium-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-display-medium-font-weight)',
    fontSize: 'var(--md-sys-typescale-display-medium-font-size)',
    letterSpacing: 'var(--md-sys-typescale-display-medium-tracking)',
    lineHeight: 'var(--md-sys-typescale-display-medium-height)',
    textTransform: 'var(--md-sys-typescale-display-medium-text-transform)',
    textDecoration: 'var(--md-sys-typescale-display-medium-text-decoration)',
  },
  'display-small': {
    fontFamily: 'var(--md-sys-typescale-display-small-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-display-small-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-display-small-font-weight)',
    fontSize: 'var(--md-sys-typescale-display-small-font-size)',
    letterSpacing: 'var(--md-sys-typescale-display-small-tracking)',
    lineHeight: 'var(--md-sys-typescale-display-small-height)',
    textTransform: 'var(--md-sys-typescale-display-small-text-transform)',
    textDecoration: 'var(--md-sys-typescale-display-small-text-decoration)',
  },
  'headline-large': {
    fontFamily: 'var(--md-sys-typescale-headline-large-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-headline-large-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-headline-large-font-weight)',
    fontSize: 'var(--md-sys-typescale-headline-large-font-size)',
    letterSpacing: 'var(--md-sys-typescale-headline-large-tracking)',
    lineHeight: 'var(--md-sys-typescale-headline-large-height)',
    textTransform: 'var(--md-sys-typescale-headline-large-text-transform)',
    textDecoration: 'var(--md-sys-typescale-headline-large-text-decoration)',
  },
  'headline-medium': {
    fontFamily: 'var(--md-sys-typescale-headline-medium-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-headline-medium-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-headline-medium-font-weight)',
    fontSize: 'var(--md-sys-typescale-headline-medium-font-size)',
    letterSpacing: 'var(--md-sys-typescale-headline-medium-tracking)',
    lineHeight: 'var(--md-sys-typescale-headline-medium-height)',
    textTransform: 'var(--md-sys-typescale-headline-medium-text-transform)',
    textDecoration: 'var(--md-sys-typescale-headline-medium-text-decoration)',
  },
  'headline-small': {
    fontFamily: 'var(--md-sys-typescale-headline-small-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-headline-small-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-headline-small-font-weight)',
    fontSize: 'var(--md-sys-typescale-headline-small-font-size)',
    letterSpacing: 'var(--md-sys-typescale-headline-small-tracking)',
    lineHeight: 'var(--md-sys-typescale-headline-small-height)',
    textTransform: 'var(--md-sys-typescale-headline-small-text-transform)',
    textDecoration: 'var(--md-sys-typescale-headline-small-text-decoration)',
  },
  'title-large': {
    fontFamily: 'var(--md-sys-typescale-title-large-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-title-large-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-title-large-font-weight)',
    fontSize: 'var(--md-sys-typescale-title-large-font-size)',
    letterSpacing: 'var(--md-sys-typescale-title-large-tracking)',
    lineHeight: 'var(--md-sys-typescale-title-large-height)',
    textTransform: 'var(--md-sys-typescale-title-large-text-transform)',
    textDecoration: 'var(--md-sys-typescale-title-large-text-decoration)',
  },
  'title-medium': {
    fontFamily: 'var(--md-sys-typescale-title-medium-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-title-medium-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-title-medium-font-weight)',
    fontSize: 'var(--md-sys-typescale-title-medium-font-size)',
    letterSpacing: 'var(--md-sys-typescale-title-medium-tracking)',
    lineHeight: 'var(--md-sys-typescale-title-medium-height)',
    textTransform: 'var(--md-sys-typescale-title-medium-text-transform)',
    textDecoration: 'var(--md-sys-typescale-title-medium-text-decoration)',
  },
  'title-small': {
    fontFamily: 'var(--md-sys-typescale-title-small-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-title-small-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-title-small-font-weight)',
    fontSize: 'var(--md-sys-typescale-title-small-font-size)',
    letterSpacing: 'var(--md-sys-typescale-title-small-tracking)',
    lineHeight: 'var(--md-sys-typescale-title-small-height)',
    textTransform: 'var(--md-sys-typescale-title-small-text-transform)',
    textDecoration: 'var(--md-sys-typescale-title-small-text-decoration)',
  },
  'body-large': {
    fontFamily: 'var(--md-sys-typescale-body-large-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-body-large-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-body-large-font-weight)',
    fontSize: 'var(--md-sys-typescale-body-large-font-size)',
    letterSpacing: 'var(--md-sys-typescale-body-large-tracking)',
    lineHeight: 'var(--md-sys-typescale-body-large-height)',
    textTransform: 'var(--md-sys-typescale-body-large-text-transform)',
    textDecoration: 'var(--md-sys-typescale-body-large-text-decoration)',
  },
  'body-medium': {
    fontFamily: 'var(--md-sys-typescale-body-medium-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-body-medium-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-body-medium-font-weight)',
    fontSize: 'var(--md-sys-typescale-body-medium-font-size)',
    letterSpacing: 'var(--md-sys-typescale-body-medium-tracking)',
    lineHeight: 'var(--md-sys-typescale-body-medium-height)',
    textTransform: 'var(--md-sys-typescale-body-medium-text-transform)',
    textDecoration: 'var(--md-sys-typescale-body-medium-text-decoration)',
  },
  'body-small': {
    fontFamily: 'var(--md-sys-typescale-body-small-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-body-small-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-body-small-font-weight)',
    fontSize: 'var(--md-sys-typescale-body-small-font-size)',
    letterSpacing: 'var(--md-sys-typescale-body-small-tracking)',
    lineHeight: 'var(--md-sys-typescale-body-small-height)',
    textTransform: 'var(--md-sys-typescale-body-small-text-transform)',
    textDecoration: 'var(--md-sys-typescale-body-small-text-decoration)',
  },
  'label-large': {
    fontFamily: 'var(--md-sys-typescale-label-large-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-label-large-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-label-large-font-weight)',
    fontSize: 'var(--md-sys-typescale-label-large-font-size)',
    letterSpacing: 'var(--md-sys-typescale-label-large-tracking)',
    lineHeight: 'var(--md-sys-typescale-label-large-height)',
    textTransform: 'var(--md-sys-typescale-label-large-text-transform)',
    textDecoration: 'var(--md-sys-typescale-label-large-text-decoration)',
  },
  'label-medium': {
    fontFamily: 'var(--md-sys-typescale-label-medium-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-label-medium-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-label-medium-font-weight)',
    fontSize: 'var(--md-sys-typescale-label-medium-font-size)',
    letterSpacing: 'var(--md-sys-typescale-label-medium-tracking)',
    lineHeight: 'var(--md-sys-typescale-label-medium-height)',
    textTransform: 'var(--md-sys-typescale-label-medium-text-transform)',
    textDecoration: 'var(--md-sys-typescale-label-medium-text-decoration)',
  },
  'label-small': {
    fontFamily: 'var(--md-sys-typescale-label-small-font-family-name)',
    fontStyle: 'var(--md-sys-typescale-label-small-font-family-style)',
    fontWeight: 'var(--md-sys-typescale-label-small-font-weight)',
    fontSize: 'var(--md-sys-typescale-label-small-font-size)',
    letterSpacing: 'var(--md-sys-typescale-label-small-tracking)',
    lineHeight: 'var(--md-sys-typescale-label-small-height)',
    textTransform: 'var(--md-sys-typescale-label-small-text-transform)',
    textDecoration: 'var(--md-sys-typescale-label-small-text-decoration)',
  },
};

export type TypoGraphyRendererReturn =
  | HTMLElement
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLPreElement
  | HTMLModElement;

export interface TypoGraphyContent
  extends BaseContent<TypoGraphyRendererReturn> {
  component: 'typography';
  type:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'pre'
    | 'b'
    | 'strong'
    | 'i'
    | 'em'
    | 'mark'
    | 'small'
    | 'del'
    | 'ins'
    | 'sub'
    | 'sup';

  style?: keyof typeof typographyStyles;
}
