/* eslint-disable @typescript-eslint/no-explicit-any */

export type Constructor<T> = new (...args: any[]) => T;

export type MaybePromise<T> = T | Promise<T>;
export type SingleOrArray<T> = T | Array<T>;

export type OmitFirstParam<F> = F extends (x: any, ...args: infer A) => infer R
  ? (...args: A) => R
  : never;

/**
 * Object that can be JSON.stringify.
 */
export type Stringifyable =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [P: string]: Stringifyable }
  | Array<Stringifyable>;

export interface StringifyableRecord {
  [P: string]: Stringifyable;
}

export type Prop<T, K> = K extends keyof T ? T[K] : never;

export type Values<T> = T[keyof T];
export type ArrayValues<T extends Readonly<Array<any>>> = T[number];
export type ArrayItems<T> = T extends Array<infer K> ? K : T;

export type Merge<M, N> = Omit<M, keyof N> & N;
