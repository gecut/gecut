import { html } from 'lit';

import '@material/web/circularprogress/circular-progress';

import type { CircularProgressContent } from '../types/circular-progress';
import type { RenderResult } from '@gecut/types';

export function renderProgress(content: CircularProgressContent): RenderResult {
  return html`
    <md-circular-progress
      .progress=${content.progress}
      ?indeterminate=${content.indeterminate}
      ?fourColor=${content.fourColor}
    ></md-circular-progress>
  `;
}
