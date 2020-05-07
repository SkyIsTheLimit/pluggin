import { AsyncPluggin, AsyncFunctionPluggin, AsyncClassPluggin } from './plugin/index';
import { series } from './operations/series';
import { parallel } from './operations/parallel';
import { execute } from './operations/execute';
import { isAsyncClassPluggin, isAsyncFunctionPluggin } from './plugin/type-guards';

export {
  AsyncPluggin,
  AsyncFunctionPluggin,
  AsyncClassPluggin,
  series as seriesAsync,
  parallel as parallelAsync,
  execute as executeAsync,
  isAsyncClassPluggin,
  isAsyncFunctionPluggin,
};
