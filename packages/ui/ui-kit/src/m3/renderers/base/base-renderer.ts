import { join } from '@gecut/utilities';

import { renderer } from '../renderers';

import type { Attributes, BaseContent } from '../../types/base/base-content';

export function createElementByContent<
  T extends keyof HTMLElementTagNameMap,
  K extends BaseContent<HTMLElementTagNameMap[T]>
>(tagName: T, content: K): HTMLElementTagNameMap[T] {
  let element = document.createElement(tagName);

  type Element = typeof element;

  if (content.attributes != null) {
    for (const attribute of Object.keys(content.attributes)) {
      if (
        attribute === 'classes' &&
        content.attributes.classes != null &&
        content.attributes.classes.length > 0
      ) {
        element = setClassList(element, content.attributes.classes);
      } else if (attribute === 'styles' && content.attributes.styles != null) {
        element = setStyle(element, content.attributes.styles);
      } else {
        element[attribute as keyof Element] = content.attributes[
            attribute
        ] as unknown as Element[keyof Element];
      }
    }
  }

  if (content.children != null) {
    for (const childContent of content.children) {
      if (typeof childContent === 'string') {
        element.innerHTML += childContent;
      } else {
        element.appendChild(renderer(childContent));
      }
    }
  }

  if (content.events != null) {
    for (const [event, callback] of Object.entries(content.events)) {
      element.addEventListener(event, (...args) => callback(...args));
    }
  }

  if (content.transformers != null) {
    if (Array.isArray(content.transformers)) {
      for (const transformer of content.transformers) {
        element = transformer(element);
      }
    } else {
      element = content.transformers(element);
    }
  }

  return element;
}

function setClassList<T extends HTMLElement>(
    element: T,
    classList: string[]
): T {
  element.className = join(' ', ...classList);

  return element;
}

function setStyle<T extends HTMLElement>(
    element: T,
    style: NonNullable<Attributes['styles']>
): T {
  for (const [name, value] of Object.entries(style)) {
    if (value != null) {
      element.style.setProperty(name, value);
    }
  }

  return element;
}
