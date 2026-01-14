import { wrap, type Remote } from 'comlink';

import { ShikiHighlightedHtmlArgs } from '../shiki';

type HighlightFn = (
  props: ShikiHighlightedHtmlArgs
) => string | undefined | Promise<string | undefined>;
type ShikiWorkerInstance =
  | Remote<{ highlight: HighlightFn; ready: () => Promise<void> }>
  | undefined;

let instance: ShikiWorkerInstance = undefined;

export function getShikiWorker(): ShikiWorkerInstance {
  if (typeof Worker === 'undefined') return undefined;
  if (instance) return instance;
  const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
  instance = wrap(worker);
  return instance;
}
