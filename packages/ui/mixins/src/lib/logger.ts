import { Constructor } from '@gecut/types';
import { Logger } from 'tslog';

import type { LitElement } from 'lit';

let lastIndex = 0;

export declare class LoggerMixinInterface extends LitElement {
  index: number;
  protected logger: Logger<unknown>;
}

export function LoggerMixin<T extends Constructor<LitElement>>(
  superClass: T
): Constructor<LoggerMixinInterface> & T {
  class LoggerMixinClass extends superClass {
    index = ++lastIndex;
    protected logger = new Logger({ name: this.tagName, type: 'pretty' });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      this.logger.log(this.index, 'constructor');
    }

    // override connectedCallback(): void {
    //   this._logger.logMethod('connectedCallback');
    //   super.connectedCallback();
    // }

    // override disconnectedCallback(): void {
    //   this._logger.logMethod('disconnectedCallback');
    //   super.disconnectedCallback();
    // }

    // protected override update(changedProperties: PropertyValues): void {
    //   this._logger.logMethodArgs('update', { changedProperties });
    //   super.update(changedProperties);
    // }

    // protected override firstUpdated(changedProperties: PropertyValues): void {
    //   this._logger.logMethodArgs('firstUpdated', { changedProperties });
    //   super.firstUpdated(changedProperties);
    // }

    // protected override render(): unknown {
    //   this._logger.logMethod('render');
    //   return;
    // }

    // override dispatchEvent(event: Event): boolean {
    //   this._logger.logMethodArgs('dispatchEvent', {
    //     type: event.type,
    //     detail: (event as Event & { detail?: unknown }).detail,
    //   });
    //   return super.dispatchEvent(event);
    // }
  }

  return LoggerMixinClass as unknown as Constructor<LoggerMixinInterface> & T;
}
