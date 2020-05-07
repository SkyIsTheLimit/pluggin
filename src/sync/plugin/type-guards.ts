import { Pluggin, ClassPluggin, FunctionPluggin } from './index';

/**
 * A typeguard to indicate a plugin is a class style plugin.
 *
 * @param plugin The plugin to check.
 */
export const isClassPluggin = <T, R>(plugin: Pluggin<T, R>): plugin is ClassPluggin<T, R> => {
  return (plugin as ClassPluggin<T, R>).execute !== undefined;
};

/**
 * A typeguard to indicate a plugin is a function style plugin.
 *
 * @param plugin The plugin to check.
 */
export const isFunctionPluggin = <T, R>(plugin: Pluggin<T, R>): plugin is FunctionPluggin<T, R> => {
  return (plugin as ClassPluggin<T, R>).execute === undefined;
};
