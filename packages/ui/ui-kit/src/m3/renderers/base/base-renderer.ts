import { renderer } from '../renderers';

import type { BaseContent, CSSProperty } from '../../types/base/base-content';

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

  element.hidden = content.hidden === true;

  if (content.customConfig != null) {
    element = content.customConfig(element);
  }

  if (content.classes != null) {
    element.className = content.classes.join(' ');
  }

  if (content.styles != null) {
    for (const _property of Object.keys(content.styles)) {
      const property = _property as CSSProperty;
      const value = content.styles[property];

      if (value != null) {
        element.style.setProperty(property, value);
      }
    }
  }

  if (content.styleVars != null) {
    for (const property of Object.keys(content.styleVars)) {
      const value = content.styleVars[property];

      element.style.setProperty(property, value);
    }
  }

  if (content.slot != null) {
    element.slot = content.slot;
  }

  if (content.slotList != null) {
    for (const slotContent of content.slotList) {
      if (typeof slotContent === 'string') {
        element.innerHTML += slotContent;
      } else {
        const slotElement = renderer(slotContent);

        if (slotElement != null) {
          element.appendChild(slotElement);
        }
      }
    }
  }

  return element;
}
