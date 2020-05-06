import { AsyncPlugin } from './../plugin/index';
import { execute } from './execute';
/**
 * Function to combine plugins in parallel. This function executes the plugins independently and merges the output of all the plugins.
 * All the plugins will have the same input and output type since the start and stop of all plugins happens at the same point.
 *
 * @param plugins The plugins to combine in parallel.
 */
export function parallel<I, O>(...plugins: AsyncPlugin<I, O>[]): AsyncPlugin<I, O> {
  return (input: I): Promise<O> =>
    new Promise((resolve) => {
      Promise.all(plugins.map((plugin) => execute(plugin, input))).then((values: O[]) => {
        let acc = {};

        values.forEach((value) => {
          acc = {
            ...acc,
            ...(value || {}),
          };
        });

        resolve(acc as O);
      });
    });
}
