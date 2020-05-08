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
  plugin5: AsyncPluggin<D, O>,
): AsyncPluggin<I, O>;
export function series<I, A, B, C, D, E, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, C>,
  plugin4: AsyncPluggin<C, D>,
  plugin5: AsyncPluggin<D, E>,
  plugin6: AsyncPluggin<E, O>,
): AsyncPluggin<I, O>;
export function series<I, A, B, C, D, E, F, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, C>,
  plugin4: AsyncPluggin<C, D>,
  plugin5: AsyncPluggin<D, E>,
  plugin6: AsyncPluggin<E, F>,
  plugin7: AsyncPluggin<F, O>,
): AsyncPluggin<I, O>;
export function series<I, A, B, C, D, E, F, G, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, C>,
  plugin4: AsyncPluggin<C, D>,
  plugin5: AsyncPluggin<D, E>,
  plugin6: AsyncPluggin<E, F>,
  plugin7: AsyncPluggin<F, G>,
  plugin8: AsyncPluggin<G, O>,
): AsyncPluggin<I, O>;
export function series<I, A, B, C, D, E, F, G, H, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, C>,
  plugin4: AsyncPluggin<C, D>,
  plugin5: AsyncPluggin<D, E>,
  plugin6: AsyncPluggin<E, F>,
  plugin7: AsyncPluggin<F, G>,
  plugin8: AsyncPluggin<G, H>,
  plugin9: AsyncPluggin<H, O>,
): AsyncPluggin<I, O>;
export function series<I, A, B, C, D, E, F, G, H, J, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, C>,
  plugin4: AsyncPluggin<C, D>,
  plugin5: AsyncPluggin<D, E>,
  plugin6: AsyncPluggin<E, F>,
  plugin7: AsyncPluggin<F, G>,
  plugin8: AsyncPluggin<G, H>,
  plugin9: AsyncPluggin<H, J>,
  plugin10: AsyncPluggin<J, O>,
): AsyncPluggin<I, O>;
export function series<I, A, B, C, D, E, F, G, H, J, K, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, C>,
  plugin4: AsyncPluggin<C, D>,
  plugin5: AsyncPluggin<D, E>,
  plugin6: AsyncPluggin<E, F>,
  plugin7: AsyncPluggin<F, G>,
  plugin8: AsyncPluggin<G, H>,
  plugin9: AsyncPluggin<H, J>,
  plugin10: AsyncPluggin<J, K>,
  plugin11: AsyncPluggin<K, O>,
): AsyncPluggin<I, O>;
export function series<I, A, B, C, D, E, F, G, H, J, K, L, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, C>,
  plugin4: AsyncPluggin<C, D>,
  plugin5: AsyncPluggin<D, E>,
  plugin6: AsyncPluggin<E, F>,
  plugin7: AsyncPluggin<F, G>,
  plugin8: AsyncPluggin<G, H>,
  plugin9: AsyncPluggin<H, J>,
  plugin10: AsyncPluggin<J, K>,
  plugin11: AsyncPluggin<K, L>,
  plugin12: AsyncPluggin<L, O>,
): AsyncPluggin<I, O>;
export function series<I, A, B, C, D, E, F, G, H, J, K, L, O>(
  plugin1: AsyncPluggin<I, A>,
  plugin2: AsyncPluggin<A, B>,
  plugin3: AsyncPluggin<B, C>,
  plugin4: AsyncPluggin<C, D>,
  plugin5: AsyncPluggin<D, E>,
  plugin6: AsyncPluggin<E, F>,
  plugin7: AsyncPluggin<F, G>,
  plugin8: AsyncPluggin<G, H>,
  plugin9: AsyncPluggin<H, J>,
  plugin10: AsyncPluggin<J, K>,
  plugin11: AsyncPluggin<K, L>,
  plugin12: AsyncPluggin<L, O>,
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
