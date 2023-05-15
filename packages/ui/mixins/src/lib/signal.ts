import { addListener, removeListener } from '@gecut/signal';
import { LitElement } from 'lit';

import type { SignalListener } from '@gecut/signal';
import type { Constructor } from '@gecut/types';


export declare class SignalMixinInterface extends LitElement {
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
    private signalListeners: {
      [T in keyof Signals]?: {
        listeners: SignalListener<T>[];
      };
    } = {};

    override disconnectedCallback(): void {
      for (const signalListenerName of Object.keys(this.signalListeners)) {
        const _signalListenerName = signalListenerName as keyof Signals;
        const _signalListeners =
          this.signalListeners[_signalListenerName]?.listeners;

        if (_signalListeners != null) {
          for (const listener of _signalListeners) {
            removeListener(_signalListenerName, listener);
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
