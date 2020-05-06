/**
 * The core type used to represent any externally pluggable code. This type essentially
 * decouples entities within a system. This helps in writing robust scalable systems which
 * can be extended without actually modifying the core of the system.
 *
 * The generic types represents the types on which the plugin operates. The types represent
 * the input and output types of the plugin. The type defines the exact identity of a plugin
 * and where it can be used.
 */
export type Plugin<Input, Output> = ClassPlugin<Input, Output> | FunctionPlugin<Input, Output>;

/**
 * A function plugin is a unary function which takes in a single input and returns a
 * single output.
 */
export type FunctionPlugin<Input, Output> = (input: Input) => Output;

/**
 * A class type plugin is a class which implements an execute method
 */
export type ClassPlugin<Input, Output> = {
  /**
   * The execute method of a plugin is responsible for either transforming the input that is
   * passed to it or returning an extracted value from the input.
   *
   * @param input The input provided to the plugin.
   */
  execute(input: Input): Output;
};
