import type { ArrayValues } from '@gecut/types';

export const foregroundColors = {
  RED: '#EF5350',
  PINK: '#F06292',
  PURPLE: '#AB47BC',
  DEEP_PURPLE: '#7E57C2',
  INDIGO: '#5C6BC0',
  BLUE: '#42A5F5',
  LIGHT_BLUE: '#03A9F4',
  CYAN: '#26C6DA',
  TEAL: '#009688',
  GREEN: '#4CAF50',
  LIGHT_GREEN: '#8BC34A',
  LIME: '#CDDC39',
  YELLOW: '#FDD835',
  AMBER: '#FFC107',
  ORANGE: '#FF9800',
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
