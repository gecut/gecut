interface IndexableWindow {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const win = globalThis as IndexableWindow;

const requestAnimationFrameFallback = (
    callback: FrameRequestCallback
): ReturnType<typeof setTimeout> =>
  setTimeout(() => callback(Date.now()), 1000 / 60);

export const gecutAnimationFrame: typeof globalThis.requestAnimationFrame =
  win['requestAnimationFrame'] ||
  win['webkitRequestAnimationFrame'] ||
  win['mozRequestAnimationFrame'] ||
  requestAnimationFrameFallback;

const requestIdleCallbackFallback = (
    callback: () => void,
    options?: IdleRequestOptions
): ReturnType<typeof setTimeout> =>
  setTimeout(callback, options?.timeout ?? 1000);

export const gecutIdleCallback: typeof globalThis.requestIdleCallback =
  win['requestIdleCallback'] ||
  win['webkitRequestIdleCallback'] ||
  win['mozRequestIdleCallback'] ||
  requestIdleCallbackFallback;

const cancelAnimationFrameFallback = (handle: number): void => {
  console.log(handle);
};

export const gecutCancelAnimationFrame: typeof globalThis.cancelAnimationFrame =
  win['cancelAnimationFrame'] ||
  win['webkitCancelAnimationFrame'] ||
  win['mozCancelAnimationFrame'] ||
  cancelAnimationFrameFallback;

const cancelIdleCallbackFallback = (handle: number): void => {
  console.log(handle);
};

export const gecutCancelIdleCallback: typeof globalThis.cancelIdleCallback =
  win['cancelIdleCallback'] ||
  win['webkitCancelIdleCallback'] ||
  win['mozCancelIdleCallback'] ||
  cancelIdleCallbackFallback;
