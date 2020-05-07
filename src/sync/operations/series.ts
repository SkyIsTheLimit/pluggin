import { Pluggin } from './../plugin/index';
import { execute } from './execute';

export function series<I, A, O>(plugin1: Pluggin<I, A>, plugin2: Pluggin<A, O>): Pluggin<I, O>;
export function series<I, A, B, O>(
  plugin1: Pluggin<I, A>,
  plugin2: Pluggin<A, B>,
  plugin3: Pluggin<B, O>,
): Pluggin<I, O>;
export function series<I, A, B, C, O>(
  plugin1: Pluggin<I, A>,
  plugin2: Pluggin<A, B>,
  plugin3: Pluggin<B, C>,
  plugin4: Pluggin<C, O>,
): Pluggin<I, O>;
export function series<I, A, B, C, D, O>(
  plugin1: Pluggin<I, A>,
  plugin2: Pluggin<A, B>,
  plugin3: Pluggin<B, C>,
  plugin4: Pluggin<C, D>,
  ...plugins: Pluggin<unknown, unknown>[]
): Pluggin<I, unknown>;

/**
 * Function to combine plugins in series. This function will chain the plugins passed to it which means the type of the output of
 * a plugin has to match the type of the input of the next plugin. It returns a plugin which takes as input the type of the input of
 * the first plugin and returns as output the type of the output of the last plugin.
 *
 * @param plugins The list of plugins to combine in series.
 */
/* eslint-disable */
export function series(...plugins: Pluggin<any, any>[]): Pluggin<any, any> {
  function combineArray<I, O>(plugins: Pluggin<any, any>[]): Pluggin<I, O> {
    return plugins.reduce((accPlugin, plugin) => {
      return (input: I): O => {
        return execute(plugin, execute(accPlugin, input));
      };
    });
  }

  return combineArray(plugins);
}
/* eslint-enable */
