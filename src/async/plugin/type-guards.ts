import { AsyncPlugin, AsyncClassPlugin, AsyncFunctionPlugin } from './index';

/**
 * A typeguard to indicate a plugin is a class style plugin.
 *
 * @param plugin The plugin to check.
 */
export const isAsyncClassPlugin = <T, R>(plugin: AsyncPlugin<T, R>): plugin is AsyncClassPlugin<T, R> => {
  return (plugin as AsyncClassPlugin<T, R>).execute !== undefined;
};

/**
 * A typeguard to indicate a plugin is a function style plugin.
 *
 * @param plugin The plugin to check.
 */
export const isAsyncFunctionPlugin = <T, R>(plugin: AsyncPlugin<T, R>): plugin is AsyncFunctionPlugin<T, R> => {
  return (plugin as AsyncClassPlugin<T, R>).execute === undefined;
};
