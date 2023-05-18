import { renderer } from '../renderers';

import type { BaseContent } from '../../types/base/base-content';

export function createElementByContent<
  T extends keyof HTMLElementTagNameMap,
  K extends BaseContent<HTMLElementTagNameMap[T]>
>(tagName: T, content: K, attributes: (keyof K)[]): HTMLElementTagNameMap[T] {
  let element = document.createElement(tagName);

  for (const key of attributes) {
    const value = content[key];

    if (value != null) {
      const _key = key as keyof HTMLElementTagNameMap[T];

      element[_key] = value as HTMLElementTagNameMap[T][typeof _key];
    }
  }

  if (content.customConfig != null) {
    element = content.customConfig(element);
  }

  if (content.classes != null) {
    element.className = content.classes.join(' ');
  }

  if (content.slot != null) {
    element.slot = content.slot;
  }

  if (content.slotList != null) {
    for (const slotContent of content.slotList) {
      const slotElement = renderer(slotContent);

      if (slotElement != null) {
        element.appendChild(slotElement);
      }
    }
  }

  return element;
}
