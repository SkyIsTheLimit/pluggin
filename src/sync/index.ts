import { Pluggin, FunctionPluggin, ClassPluggin } from './plugin/index';
import { series } from './operations/series';
import { parallel } from './operations/parallel';
import { execute } from './operations/execute';
import { isClassPluggin, isFunctionPluggin } from './plugin/type-guards';

export { Pluggin, FunctionPluggin, ClassPluggin, series, parallel, execute, isClassPluggin, isFunctionPluggin };
