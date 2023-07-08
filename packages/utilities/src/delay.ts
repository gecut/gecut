import { gecutAnimationFrame, gecutIdleCallback } from './polyfill';

export const untilMS = async (delayMS: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, delayMS));
};

export const untilNextFrame = async () => {
  return new Promise<number>((resolve) => gecutAnimationFrame(resolve));
};

export const untilIdle = async () => {
  return new Promise<IdleDeadline>((resolve) => gecutIdleCallback(resolve));
};

export const untilEvent = <T extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  eventName: T
): Promise<HTMLElementEventMap[T]> => {
  return new Promise((resolve) =>
    element.addEventListener(eventName, resolve, { once: true, passive: true })
  );
};
