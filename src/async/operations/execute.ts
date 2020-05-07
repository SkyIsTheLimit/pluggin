import { AsyncPluggin } from '../plugin/index';
import { isAsyncClassPluggin } from '../plugin/type-guards';
/**
 * Function to execute a plugin. Because a plugin can fundamentally be a class style plugin or a function
 * style plugin, this function makes it easier to execute either of them with just one statement.
 *
 * @param plugin The plugin to execute.
 * @param input The input to pass to the plugin.
 */
export const execute = <I, O>(plugin: AsyncPluggin<I, O>, input: I): Promise<O> => {
  if (isAsyncClassPluggin(plugin)) {
    return plugin.execute(input);
  } else {
    return plugin(input);
  }
};
