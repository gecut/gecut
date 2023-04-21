export interface Logger {
  readonly devMode: boolean;

  readonly scopeName: string;

  property?(property: string, value: unknown): void;

  method?(method: string): void;

  methodArgs?(method: string, args: unknown): void;

  methodFull?(method: string, args: unknown, result: unknown): void;

  warning(method: string, code: string, desc: string, ...args: unknown[]): void;

  error(method: string, code: string, ...args: unknown[]): void;

  other?(...args: unknown[]): void;

  time?(label: string): void;

  timeEnd?(label: string): void;
}
