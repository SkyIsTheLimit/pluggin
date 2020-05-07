import { AsyncPluggin, AsyncClassPluggin, AsyncFunctionPluggin } from './index';

/**
 * A typeguard to indicate a plugin is a class style plugin.
 *
 * @param plugin The plugin to check.
 */
export const isAsyncClassPluggin = <T, R>(plugin: AsyncPluggin<T, R>): plugin is AsyncClassPluggin<T, R> => {
  return (plugin as AsyncClassPluggin<T, R>).execute !== undefined;
};

/**
 * A typeguard to indicate a plugin is a function style plugin.
 *
 * @param plugin The plugin to check.
 */
export const isAsyncFunctionPluggin = <T, R>(plugin: AsyncPluggin<T, R>): plugin is AsyncFunctionPluggin<T, R> => {
  return (plugin as AsyncClassPluggin<T, R>).execute === undefined;
};
