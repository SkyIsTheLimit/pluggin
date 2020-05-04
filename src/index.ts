import { Plugin, FunctionPlugin, ClassPlugin } from './plugin/index';
import { series } from './operations/series';
import { parallel } from './operations/parallel';
import { execute } from './operations/execute';
import { isClassPlugin, isFunctionPlugin } from './plugin/type-guards';

export { Plugin, FunctionPlugin, ClassPlugin, series, parallel, execute, isClassPlugin, isFunctionPlugin };
