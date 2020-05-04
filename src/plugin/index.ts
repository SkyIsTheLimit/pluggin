/**
 * This type describes the output of any plugin. It's sort of a universal type and that
 * is intentional so that a plugin can return data in any shape and form.
 */
export type PluginResult =
  | string
  | number
  | boolean
  | PluginResult[]
  | {
      [key: string]: PluginResult;
    };

/**
 * The core type used to represent any externally pluggable code. This type essentially
 * decouples entities within a system. This helps in writing robust scalable systems which
 * can be extended without actually modifying the core of the system.
 *
 * The generic type represents the type on which the plugin operates. The type should be
 * looked upon as the underlying type of the plugin. The type defines the exact identity of
 * a plugin and where it can be used.
 */
export type Plugin<I, O> = ClassPlugin<I, O> | FunctionPlugin<I, O>;

/**
 * A function plugin is a unary function which takes in a single input and returns a
 * single output.
 */
export type FunctionPlugin<I, O> = (input: I) => O;

/**
 * A class type plugin is a class which implements an execute method
 */
export type ClassPlugin<I, O> = {
  /**
   * The execute method of a plugin is responsible for either transforming the input that is
   * passed to it or returning an extracted value from the input.
   *
   * @param input The input provided to the plugin.
   */
  execute(input: I): O;
};
