import { AsyncPluggin } from './../plugin/index';
import { execute } from './execute';

export function series<I, A, O>(plugin1: AsyncPluggin<I, A>, plugin2: AsyncPluggin<A, O>): AsyncPluggin<I, O>;
export function series<I, A, B, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, O>,
): AsyncPluggin<I, O>;
export function series<I, A, B, C, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, C>,
  plugin4: AsyncPluggin<C, O>,
): AsyncPluggin<I, O>;
export function series<I, A, B, C, D, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, C>,
  plugin4: AsyncPluggin<C, D>,
  ...plugins: AsyncPluggin<unknown, unknown>[]
): AsyncPluggin<I, unknown>;

/**
 * Function to combine plugins in series. This function will chain the plugins passed to it which means the type of the output of
 * a plugin has to match the type of the input of the next plugin. It returns a plugin which takes as input the type of the input of
 * the first plugin and returns as output the type of the output of the last plugin.
 *
 * @param plugins The list of plugins to combine in series.
 */
/* eslint-disable */
export function series(...plugins: AsyncPluggin<any, any>[]): AsyncPluggin<any, any> {
  function combineArray<I, O>(plugins: AsyncPluggin<any, any>[]): AsyncPluggin<I, O> {
    return (input: I) => {
      const executeTopPlugin = (plugins: AsyncPluggin<any, any>[], input: any): Promise<O> => {
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
