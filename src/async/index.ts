import { AsyncPlugin, AsyncFunctionPlugin, AsyncClassPlugin } from './plugin/index';
import { series } from './operations/series';
import { parallel } from './operations/parallel';
import { execute } from './operations/execute';
import { isAsyncClassPlugin, isAsyncFunctionPlugin } from './plugin/type-guards';

export {
  AsyncPlugin,
  AsyncFunctionPlugin,
  AsyncClassPlugin,
  series as seriesAsync,
  parallel as parallelAsync,
  execute as executeAsync,
  isAsyncClassPlugin,
  isAsyncFunctionPlugin,
};
