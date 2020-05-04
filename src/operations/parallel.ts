import { Plugin } from './../plugin/index';
import { execute } from './execute';
/**
 * Function to combine plugins in parallel. This function executes the plugins independently and merges the output of all the plugins.
 * All the plugins will have the same input and output type since the start and stop of all plugins happens at the same point.
 *
 * @param plugins The plugins to combine in parallel.
 */
export function parallel<I, O>(...plugins: Plugin<I, O>[]): Plugin<I, O> {
  return ((input: I) =>
    plugins
      .map((plugin) => execute(plugin, input))
      .reduce(
        (acc: O, curr) => ({
          ...acc,
          ...(curr || ({} as O)),
        }),
        {} as O,
      )) as Plugin<I, O>;
}
