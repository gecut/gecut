declare global {
  interface Signals {
    readonly 'signal-test-1': Record<string, string>;
  }
  interface Providers {
    readonly 'signal-test-1': string;
  }
}

export type SignalListener<T extends keyof Signals> = (
  data: Signals[T]
) => void;
export type SignalProvider<T extends keyof Providers> = (
  args: Providers[T]
) => Signals[T];
export type SignalNonNullable<T extends keyof Signals> = NonNullable<
  SignalsObject[T]
>;
export type SignalsObject = {
  [T in keyof Signals]?: {
    value: Signals[T] | undefined;
    provider: SignalProvider<T> | undefined;
    listeners: SignalListener<T>[];
  };
};
