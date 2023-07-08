import { addListener, removeListener } from '@gecut/signal';
import { LitElement } from 'lit';

import type { SignalListener, createSignalProvider } from '@gecut/signal';
import type { Constructor } from '@gecut/types';

export type SignalsRecord = Partial<
  Record<keyof Signals, ReturnType<typeof createSignalProvider>>
>;

export declare class SignalMixinInterface extends LitElement {
  static signals: SignalsRecord;

  protected addSignalListener: <T extends keyof Signals>(
    name: T,
    listener: SignalListener<T>
  ) => void;

  private signalListeners: {
    [T in keyof Signals]?: {
      listeners: SignalListener<T>[];
    };
  };
}

export function SignalMixin<T extends Constructor<LitElement>>(
    superClass: T
): Constructor<SignalMixinInterface> & T {
  class SignalMixinClass extends superClass {
    static signals: SignalsRecord = {};

    private signalListeners: {
      [T in keyof Signals]?: {
        listeners: SignalListener<T>[];
      };
    } = {};

    override disconnectedCallback(): void {
      for (const signalListenerName of Object.keys(this.signalListeners)) {
        const listeners =
          this.signalListeners[signalListenerName as keyof Signals]?.listeners;

        if (listeners != null) {
          for (const listener of listeners) {
            removeListener(signalListenerName as keyof Signals, listener);
          }
        }
      }

      super.disconnectedCallback();
    }

    protected addSignalListener<T extends keyof Signals>(
        name: T,
        listener: SignalListener<T>
    ): void {
      this.signalListeners[name] ??= {
        listeners: [],
      };

      this.signalListeners[name]?.listeners.push(listener);

      addListener(name, listener);
    }
  }

  return SignalMixinClass as unknown as Constructor<SignalMixinInterface> & T;
}
