import { Plugin, ClassPlugin, FunctionPlugin } from './index';

/**
 * A typeguard to indicate a plugin is a class style plugin.
 *
 * @param plugin The plugin to check.
 */
export const isClassPlugin = <T, R>(plugin: Plugin<T, R>): plugin is ClassPlugin<T, R> => {
  return (plugin as ClassPlugin<T, R>).execute !== undefined;
};

/**
 * A typeguard to indicate a plugin is a function style plugin.
 *
 * @param plugin The plugin to check.
 */
export const isFunctionPlugin = <T, R>(plugin: Plugin<T, R>): plugin is FunctionPlugin<T, R> => {
  return (plugin as ClassPlugin<T, R>).execute === undefined;
};
