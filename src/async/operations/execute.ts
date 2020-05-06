import { AsyncPlugin } from '../plugin/index';
import { isAsyncClassPlugin } from '../plugin/type-guards';
/**
 * Function to execute a plugin. Because a plugin can fundamentally be a class style plugin or a function
 * style plugin, this function makes it easier to execute either of them with just one statement.
 *
 * @param plugin The plugin to execute.
 * @param input The input to pass to the plugin.
 */
export const execute = <I, O>(plugin: AsyncPlugin<I, O>, input: I): Promise<O> => {
  if (isAsyncClassPlugin(plugin)) {
    return plugin.execute(input);
  } else {
    return plugin(input);
  }
};
