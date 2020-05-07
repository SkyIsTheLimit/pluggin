/**
 * The core type used to represent any externally pluggable code. This type essentially
 * decouples entities within a system. This helps in writing robust scalable systems which
 * can be extended without actually modifying the core of the system.
 *
 * The generic types represents the types on which the plugin operates. The types represent
 * the input and output types of the plugin. The type defines the exact identity of a plugin
 * and where it can be used.
 *
 * The AsyncPlugin represents a plugin that needs to perform an async task during its execution.
 */
export type AsyncPluggin<Input, Output> = AsyncClassPluggin<Input, Output> | AsyncFunctionPluggin<Input, Output>;

/**
 * A function plugin is a unary function which takes in a single input and returns a
 * single output.
 */
export type AsyncFunctionPluggin<Input, Output> = (input: Input) => Promise<Output>;

/**
 * A class type plugin is a class which implements an execute method
 */
export type AsyncClassPluggin<Input, Output> = {
  /**
   * The execute method of a plugin is responsible for either transforming the input that is
   * passed to it or returning an extracted value from the input.
   *
   * @param input The input provided to the plugin.
   */
  execute(input: Input): Promise<Output>;
};
