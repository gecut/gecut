import elementStyle from '#persianpart/ui/stylesheets/element.css?inline';

import { scheduleSignalElement } from '@gecut/mixins';
import { unsafeCSS } from 'lit';

export abstract class ComponentBase extends scheduleSignalElement {
  static signals = {};
  static override styles = [unsafeCSS(elementStyle)];
}
