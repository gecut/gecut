import type { CustomConfigFunction, AllComponentsContent } from '../types';

export interface BaseContent<
  TCustomConfig extends HTMLElement,
  TSlot = string,
  TSlotList =
    | string
    | (AllComponentsContent<unknown> & { slot?: TSlot | string })
> {
  hidden?: boolean;
  slot?: string;
  slotList?: TSlotList[];
  classes?: string[];
  styles?: Partial<Record<CSSProperty, string>>;
  styleVars?: Record<string, string>;
  customConfig?: CustomConfigFunction<TCustomConfig>;
}

export type CSSProperty =
  | 'accent-color'
  | 'align-content'
  | 'align-items'
  | 'align-self'
  | 'alignment-baseline'
  | 'all'
  | 'animation'
  | 'animation-delay'
  | 'animation-direction'
  | 'animation-duration'
  | 'animation-fill-mode'
  | 'animation-iteration-count'
  | 'animation-name'
  | 'animation-play-state'
  | 'animation-timing-function'
  | 'appearance'
  | 'aspect-ratio'
  | 'backdrop-filter'
  | 'backface-visibility'
  | 'background'
  | 'background-attachment'
  | 'background-blend-mode'
  | 'background-clip'
  | 'background-color'
  | 'background-image'
  | 'background-origin'
  | 'background-position'
  | 'background-position-x'
  | 'background-position-y'
  | 'background-repeat'
  | 'background-size'
  | 'baseline-shift'
  | 'block-size'
  | 'border'
  | 'border-block'
  | 'border-block-color'
  | 'border-block-end'
  | 'border-block-end-color'
  | 'border-block-end-style'
  | 'border-block-end-width'
  | 'border-block-start'
  | 'border-block-start-color'
  | 'border-block-start-style'
  | 'border-block-start-width'
  | 'border-block-style'
  | 'border-block-width'
  | 'border-bottom'
  | 'border-bottom-color'
  | 'border-bottom-left-radius'
  | 'border-bottom-right-radius'
  | 'border-bottom-style'
  | 'border-bottom-width'
  | 'border-collapse'
  | 'border-color'
  | 'border-end-end-radius'
  | 'border-end-start-radius'
  | 'border-image'
  | 'border-image-outset'
  | 'border-image-repeat'
  | 'border-image-slice'
  | 'border-image-source'
  | 'border-image-width'
  | 'border-inline'
  | 'border-inline-color'
  | 'border-inline-end'
  | 'border-inline-end-color'
  | 'border-inline-end-style'
  | 'border-inline-end-width'
  | 'border-inline-start'
  | 'border-inline-start-color'
  | 'border-inline-start-style'
  | 'border-inline-start-width'
  | 'border-inline-style'
  | 'border-inline-width'
  | 'border-left'
  | 'border-left-color'
  | 'border-left-style'
  | 'border-left-width'
  | 'border-radius'
  | 'border-right'
  | 'border-right-color'
  | 'border-right-style'
  | 'border-right-width'
  | 'border-spacing'
  | 'border-start-end-radius'
  | 'border-start-start-radius'
  | 'border-style'
  | 'border-top'
  | 'border-top-color'
  | 'border-top-left-radius'
  | 'border-top-right-radius'
  | 'border-top-style'
  | 'border-top-width'
  | 'border-width'
  | 'bottom'
  | 'box-shadow'
  | 'box-sizing'
  | 'break-after'
  | 'break-before'
  | 'break-inside'
  | 'caption-side'
  | 'caret-color'
  | 'clear'
  | 'clip-path'
  | 'clip-rule'
  | 'color'
  | 'color-interpolation'
  | 'color-interpolation-filters'
  | 'color-scheme'
  | 'column-count'
  | 'column-fill'
  | 'column-gap'
  | 'column-rule'
  | 'column-rule-color'
  | 'column-rule-style'
  | 'column-rule-width'
  | 'column-span'
  | 'column-width'
  | 'columns'
  | 'contain'
  | 'contain-intrinsic-block-size'
  | 'contain-intrinsic-height'
  | 'contain-intrinsic-inline-size'
  | 'contain-intrinsic-size'
  | 'contain-intrinsic-width'
  | 'container'
  | 'container-name'
  | 'container-type'
  | 'content'
  | 'content-visibility'
  | 'counter-increment'
  | 'counter-reset'
  | 'counter-set'
  | 'css-float'
  | 'css-text'
  | 'cursor'
  | 'direction'
  | 'display'
  | 'dominant-baseline'
  | 'empty-cells'
  | 'fill'
  | 'fill-opacity'
  | 'fill-rule'
  | 'filter'
  | 'flex'
  | 'flex-basis'
  | 'flex-direction'
  | 'flex-flow'
  | 'flex-grow'
  | 'flex-shrink'
  | 'flex-wrap'
  | 'float'
  | 'flood-color'
  | 'flood-opacity'
  | 'font'
  | 'font-family'
  | 'font-feature-settings'
  | 'font-kerning'
  | 'font-optical-sizing'
  | 'font-palette'
  | 'font-size'
  | 'font-size-adjust'
  | 'font-stretch'
  | 'font-style'
  | 'font-synthesis'
  | 'font-variant'
  | 'font-variant-alternates'
  | 'font-variant-caps'
  | 'font-variant-east-asian'
  | 'font-variant-ligatures'
  | 'font-variant-numeric'
  | 'font-variant-position'
  | 'font-variation-settings'
  | 'font-weight'
  | 'gap'
  | 'grid'
  | 'grid-area'
  | 'grid-auto-columns'
  | 'grid-auto-flow'
  | 'grid-auto-rows'
  | 'grid-column'
  | 'grid-column-end'
  | 'grid-column-start'
  | 'grid-row'
  | 'grid-row-end'
  | 'grid-row-start'
  | 'grid-template'
  | 'grid-template-areas'
  | 'grid-template-columns'
  | 'grid-template-rows'
  | 'height'
  | 'hyphenate-character'
  | 'hyphens'
  | 'image-rendering'
  | 'inline-size'
  | 'inset'
  | 'inset-block'
  | 'inset-block-end'
  | 'inset-block-start'
  | 'inset-inline'
  | 'inset-inline-end'
  | 'inset-inline-start'
  | 'isolation'
  | 'justify-content'
  | 'justify-items'
  | 'justify-self'
  | 'left'
  | 'letter-spacing'
  | 'lighting-color'
  | 'line-break'
  | 'line-height'
  | 'list-style'
  | 'list-style-image'
  | 'list-style-position'
  | 'list-style-type'
  | 'margin'
  | 'margin-block'
  | 'margin-block-end'
  | 'margin-block-start'
  | 'margin-bottom'
  | 'margin-inline'
  | 'margin-inline-end'
  | 'margin-inline-start'
  | 'margin-left'
  | 'margin-right'
  | 'margin-top'
  | 'marker'
  | 'marker-end'
  | 'marker-mid'
  | 'marker-start'
  | 'mask'
  | 'mask-clip'
  | 'mask-composite'
  | 'mask-image'
  | 'mask-mode'
  | 'mask-origin'
  | 'mask-position'
  | 'mask-repeat'
  | 'mask-size'
  | 'mask-type'
  | 'math-style'
  | 'max-block-size'
  | 'max-height'
  | 'max-inline-size'
  | 'max-width'
  | 'min-block-size'
  | 'min-height'
  | 'min-inline-size'
  | 'min-width'
  | 'mix-blend-mode'
  | 'object-fit'
  | 'object-position'
  | 'offset'
  | 'offset-distance'
  | 'offset-path'
  | 'offset-rotate'
  | 'opacity'
  | 'order'
  | 'orphans'
  | 'outline'
  | 'outline-color'
  | 'outline-offset'
  | 'outline-style'
  | 'outline-width'
  | 'overflow'
  | 'overflow-anchor'
  | 'overflow-clip-margin'
  | 'overflow-wrap'
  | 'overflow-x'
  | 'overflow-y'
  | 'overscroll-behavior'
  | 'overscroll-behavior-block'
  | 'overscroll-behavior-inline'
  | 'overscroll-behavior-x'
  | 'overscroll-behavior-y'
  | 'padding'
  | 'padding-block'
  | 'padding-block-end'
  | 'padding-block-start'
  | 'padding-bottom'
  | 'padding-inline'
  | 'padding-inline-end'
  | 'padding-inline-start'
  | 'padding-left'
  | 'padding-right'
  | 'padding-top'
  | 'page-break-after'
  | 'page-break-before'
  | 'page-break-inside'
  | 'paint-order'
  | 'perspective'
  | 'perspective-origin'
  | 'place-content'
  | 'place-items'
  | 'place-self'
  | 'pointer-events'
  | 'position'
  | 'print-color-adjust'
  | 'quotes'
  | 'resize'
  | 'right'
  | 'rotate'
  | 'row-gap'
  | 'ruby-position'
  | 'scale'
  | 'scroll-behavior'
  | 'scroll-margin'
  | 'scroll-margin-block'
  | 'scroll-margin-block-end'
  | 'scroll-margin-block-start'
  | 'scroll-margin-bottom'
  | 'scroll-margin-inline'
  | 'scroll-margin-inline-end'
  | 'scroll-margin-inline-start'
  | 'scroll-margin-left'
  | 'scroll-margin-right'
  | 'scroll-margin-top'
  | 'scroll-padding'
  | 'scroll-padding-block'
  | 'scroll-padding-block-end'
  | 'scroll-padding-block-start'
  | 'scroll-padding-bottom'
  | 'scroll-padding-inline'
  | 'scroll-padding-inline-end'
  | 'scroll-padding-inline-start'
  | 'scroll-padding-left'
  | 'scroll-padding-right'
  | 'scroll-padding-top'
  | 'scroll-snap-align'
  | 'scroll-snap-stop'
  | 'scroll-snap-type'
  | 'scrollbar-gutter'
  | 'shape-image-threshold'
  | 'shape-margin'
  | 'shape-outside'
  | 'shape-rendering'
  | 'stop-color'
  | 'stop-opacity'
  | 'stroke'
  | 'stroke-dasharray'
  | 'stroke-dashoffset'
  | 'stroke-linecap'
  | 'stroke-linejoin'
  | 'stroke-miterlimit'
  | 'stroke-opacity'
  | 'stroke-width'
  | 'tab-size'
  | 'table-layout'
  | 'text-align'
  | 'text-align-last'
  | 'text-anchor'
  | 'text-combine-upright'
  | 'text-decoration'
  | 'text-decoration-color'
  | 'text-decoration-line'
  | 'text-decoration-skip-ink'
  | 'text-decoration-style'
  | 'text-decoration-thickness'
  | 'text-emphasis'
  | 'text-emphasis-color'
  | 'text-emphasis-position'
  | 'text-emphasis-style'
  | 'text-indent'
  | 'text-orientation'
  | 'text-overflow'
  | 'text-rendering'
  | 'text-shadow'
  | 'text-transform'
  | 'text-underline-offset'
  | 'text-underline-position'
  | 'top'
  | 'touch-action'
  | 'transform'
  | 'transform-box'
  | 'transform-origin'
  | 'transform-style'
  | 'transition'
  | 'transition-delay'
  | 'transition-duration'
  | 'transition-property'
  | 'transition-timing-function'
  | 'translate'
  | 'unicode-bidi'
  | 'user-select'
  | 'vertical-align'
  | 'visibility'
  | 'webkit-line-clamp'
  | 'webkit-mask-composite'
  | 'webkit-text-fill-color'
  | 'webkit-text-stroke'
  | 'webkit-text-stroke-color'
  | 'webkit-text-stroke-width'
  | 'white-space'
  | 'widows'
  | 'width'
  | 'will-change'
  | 'word-break'
  | 'word-spacing'
  | 'writing-mode'
  | 'z-index';
