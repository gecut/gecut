declare global {
  interface Signals {
    readonly 'signal-test-1': Record<string, string>;
  }
}

export type SignalListener<T extends keyof Signals> = (data: Signals[T]) => void;
export type SignalNonNullable<T extends keyof Signals> = NonNullable<SignalsObject[T]>;
export type SignalsObject = {
  [T in keyof Signals]?: {
    value: Signals[T] | undefined;
    listeners: SignalListener<T>[];
  };
};
