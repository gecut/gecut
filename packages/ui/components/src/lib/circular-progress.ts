import type { CircularProgressContent } from '../types/circular-progress';
import type { MdCircularProgress } from '@material/web/circularprogress/circular-progress';

type renderCircularProgressReturnType = MdCircularProgress;

const circularProgressKeys = [
  'progress',
  'indeterminate',
  'fourColor',
] as const;

export function renderCircularProgress(
  content: CircularProgressContent
): renderCircularProgressReturnType {
  let progress = document.createElement(`md-${content.type}-progress`);

  for (const key of circularProgressKeys) {
    const value = content[key];

    if (value != null) {
      progress[key] = value as never;
    }
  }

  if (content.customConfig != null) {
    progress = content.customConfig(progress);
  }

  progress.classList.add(...(content.classes ?? []));

  return progress;
}
