import type { ArrayValues, SingleOrArray } from '@gecut/types';

const inputTypeList = [
  'email',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'url',
] as const;
const inputTextDirection = ['rtl', 'ltr'] as const;
const inputUI = ['outlined', 'filled'] as const;
const inputRole = [
  'alert',
  'alertdialog',
  'button',
  'checkbox',
  'dialog',
  'gridcell',
  'link',
  'log',
  'marquee',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'progressbar',
  'radio',
  'scrollbar',
  'searchbox',
  'slider',
  'spinbutton',
  'status',
  'switch',
  'tab',
  'tabpanel',
  'textbox',
  'timer',
  'tooltip',
  'treeitem',
  'combobox',
  'grid',
  'listbox',
  'menu',
  'menubar',
  'radiogroup',
  'tablist',
  'tree',
  'treegrid',
  'application',
  'article',
  'cell',
  'columnheader',
  'definition',
  'directory',
  'document',
  'feed',
  'figure',
  'group',
  'heading',
  'img',
  'list',
  'listitem',
  'math',
  'none',
  'note',
  'presentation',
  'region',
  'row',
  'rowgroup',
  'rowheader',
  'separator',
  'table',
  'term',
  'text',
  'toolbar',
  'banner',
  'complementary',
  'contentinfo',
  'form',
  'main',
  'navigation',
  'region',
  'search',
  'doc-abstract',
  'doc-acknowledgments',
  'doc-afterword',
  'doc-appendix',
  'doc-backlink',
  'doc-biblioentry',
  'doc-bibliography',
  'doc-biblioref',
  'doc-chapter',
  'doc-colophon',
  'doc-conclusion',
  'doc-cover',
  'doc-credit',
  'doc-credits',
  'doc-dedication',
  'doc-endnote',
  'doc-endnotes',
  'doc-epigraph',
  'doc-epilogue',
  'doc-errata',
  'doc-example',
  'doc-footnote',
  'doc-foreword',
  'doc-glossary',
  'doc-glossref',
  'doc-index',
  'doc-introduction',
  'doc-noteref',
  'doc-notice',
  'doc-pagebreak',
  'doc-pagelist',
  'doc-part',
  'doc-preface',
  'doc-prologue',
  'doc-pullquote',
  'doc-qna',
  'doc-subtitle',
  'doc-tip',
  'doc-toc',
] as const;
const buttonUI = ['outlined', 'filled', 'text', 'elevated', 'tonal'] as const;

export type Form = {
  components: Array<SingleOrArray<Input | Button>>;
  listener?: (
    componentData: Input | Button,
    eventName: 'input' | 'change' | 'click',
    event: InputEvent | PointerEvent
  ) => void;
};

export type FormListener = NonNullable<Form['listener']>;

export type Input = {
  name: string;
  type: ArrayValues<typeof inputTypeList>;
  ui: ArrayValues<typeof inputUI>;

  label: string;
  placeholder?: string;
  supportingText?: string;
  textDirection?: ArrayValues<typeof inputTextDirection>;

  value?: string;
  defaultValue?: string;

  role?: ArrayValues<typeof inputRole>;
  validate?: Partial<InputValidate>;
  errorText?: string;

  prefixText?: string;
  suffixText?: string;

  max?: string;
  maxLength?: number;
  min?: string;
  minLength?: number;
  step?: string;

  disabled?: boolean;
  readOnly?: boolean;

  hasLeadingIcon?: boolean;
  leadingIconSVG?: string;

  hasTrailingIcon?: boolean;
  trailingIconSVG?: string;
};

export type Button = {
  type: 'submit';
  ui: ArrayValues<typeof buttonUI>;
  align?: 'center' | 'start' | 'end';

  label: string;

  grow?: boolean;
  disabled?: boolean;
  trailingIcon?: boolean;
};

type InputValidate = {
  required: boolean;
  pattern: string;
};
