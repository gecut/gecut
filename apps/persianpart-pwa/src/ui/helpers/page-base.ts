import pageStyle from '#persianpart/ui/stylesheets/page.css?inline';

import { unsafeCSS } from 'lit';

import { ComponentBase } from './component-base';

export abstract class PageBase extends ComponentBase {
  static override styles = [...ComponentBase.styles, unsafeCSS(pageStyle)];
}
