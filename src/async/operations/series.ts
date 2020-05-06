import { AsyncPlugin } from './../plugin/index';
import { execute } from './execute';

export function series<I, A, O>(plugin1: AsyncPlugin<I, A>, plugin2: AsyncPlugin<A, O>): AsyncPlugin<I, O>;
export function series<I, A, B, O>(
  plugin1: AsyncPlugin<I, A>,
  plugin2: AsyncPlugin<A, B>,
  plugin3: AsyncPlugin<B, O>,
): AsyncPlugin<I, O>;
export function series<I, A, B, C, O>(
  plugin1: AsyncPlugin<I, A>,
  plugin2: AsyncPlugin<A, B>,
  plugin3: AsyncPlugin<B, C>,
  plugin4: AsyncPlugin<C, O>,
): AsyncPlugin<I, O>;
export function series<I, A, B, C, D, O>(
  plugin1: AsyncPlugin<I, A>,
  plugin2: AsyncPlugin<A, B>,
  plugin3: AsyncPlugin<B, C>,
  plugin4: AsyncPlugin<C, D>,
  ...plugins: AsyncPlugin<unknown, unknown>[]
): AsyncPlugin<I, unknown>;

/**
 * Function to combine plugins in series. This function will chain the plugins passed to it which means the type of the output of
 * a plugin has to match the type of the input of the next plugin. It returns a plugin which takes as input the type of the input of
 * the first plugin and returns as output the type of the output of the last plugin.
 *
 * @param plugins The list of plugins to combine in series.
 */
/* eslint-disable */
export function series(...plugins: AsyncPlugin<any, any>[]): AsyncPlugin<any, any> {
  function combineArray<I, O>(plugins: AsyncPlugin<any, any>[]): AsyncPlugin<I, O> {
    return (input: I) => {
      const executeTopPlugin = (plugins: AsyncPlugin<any, any>[], input: any): Promise<O> => {
        if (!plugins.length) {
          return Promise.resolve(input as O);
        }

        const pluginToRun = plugins.shift();

        if (pluginToRun) {
          return execute(pluginToRun, input).then((output) => {
            return executeTopPlugin(plugins, output);
          });
        }

        return executeTopPlugin(plugins, input);
      };

      return executeTopPlugin(plugins, input);
    };
  }

  return combineArray(plugins);
}
/* eslint-enable */
