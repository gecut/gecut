import type { MongoBase } from '#persianpart/entity/base';
import { PageBase } from '#persianpart/ui/helpers/page-base';
import icons from '#persianpart/ui/icons';

import i18n from '@gecut/i18n';
import { M3 } from '@gecut/ui-kit';
import { join } from '@gecut/utilities';
import { animate, fadeOut, flyBelow } from '@lit-labs/motion';
import { html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import style from './search-list.page.css?inline';

import type { RenderResult } from '@gecut/types';
import type { Options } from '@lit-labs/motion';

export abstract class PageSearchList<T extends MongoBase> extends PageBase {
  static override styles = [...PageBase.styles, unsafeCSS(style)];

  @property({ type: String, reflect: true })
    query = '';

  @state()
  protected data: T[] = [];

  override render(): RenderResult {
    super.render();

    return html`${this.renderSearchBarTemplate()}`;
  }

  renderSearchBarTemplate(): M3.Types.TextFieldRendererReturn {
    this.log.method?.('renderSearchBarTemplate');

    return M3.Renderers.renderTextField({
      type: 'outlined',
      attributes: {
        inputType: 'text',
        name: 'search',
        classes: ['search-bar'],
        placeholder: i18n.msg('search-in-products-list'),
        hasTrailingIcon: true,
      },
      children: [
        {
          component: 'icon',
          type: 'svg',
          SVG: icons.filledRounded.search,
          attributes: {
            slot: 'trailingicon',
          },
        },
      ],
    });
  }

  renderCardTemplate(): RenderResult {
    this.log.method?.('renderCardTemplate');

    return html`
      <surface-card>
        ${repeat(
          this.data,
          (item) => item.id,
          (item) => this.renderItemTemplate(item)
        )}
      </surface-card>
    `;
  }
  renderItemTemplate(item: T): RenderResult {
    this.log.method?.('renderItemTemplate');

    return html`
      <div ${animate(this.itemAnimationConfig(item))}>
        ${M3.Renderers.renderListItem(this.renderItemContent(item))}
      </div>
    `;
  }

  renderItemContent(item: T): Partial<M3.Types.ListItemContent> {
    this.log.method?.('renderItemContent');

    return {
      attributes: {
        headline: item.id.toString(),
        supportingText: i18n.date(item.createdAt),
      },
    };
  }

  itemAnimationConfig(item: T): Options {
    this.log.method?.('itemAnimationConfig');

    return {
      keyframeOptions: {
        duration: 500,
        fill: 'both' as FillMode,
      },
      in: flyBelow,
      out: fadeOut,
      stabilizeOut: true,
      id: `${item.id}`,
      inId: `${item.id}`,
      skipInitial: true,
    };
  }
  itemFilter(item: T): boolean {
    this.log.method?.('itemAnimationConfig');

    const query = this.query.trim();
    let isResult = false;

    if (query !== '') {
      const search = join(' - ', ...Object.values(item));

      isResult = search.includes(query);
    }

    return item.active === true && isResult;
  }
}
