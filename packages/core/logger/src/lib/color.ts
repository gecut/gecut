import type { ArrayValues } from '@gecut/types';

export const foregroundColors = {
  RED: '#D32F2F',
  PINK: '#C2185B',
  PURPLE: '#7B1FA2',
  DEEP_PURPLE: '#512DA8',
  INDIGO: '#303F9F',
  BLUE: '#1976D2',
  LIGHT_BLUE: '#0288D1',
  CYAN: '#0097A7',
  TEAL: '#00796B',
  GREEN: '#388E3C',
} as const;

const colorList = Object.values(foregroundColors);

let colorIndex = 0;

/**
 * The function returns a color from a list of colors and cycles through the list.
 * @returns An array value from the `colorList` array. The specific value returned depends on the
 * current value of `colorIndex`, which is incremented each time the function is called. If
 * `colorIndex` exceeds the length of `colorList`, it is reset to 0.
 */
export function getColor(): ArrayValues<typeof colorList> {
  const color = colorList[colorIndex];

  colorIndex++;

  if (colorIndex >= colorList.length) {
    colorIndex = 0;
  }

  return color;
}
