# Pluggin

A library for creating plugin systems.

## Installation

```shell
npm install pluggin
```

OR

```shell
yarn add pluggin
```

## Usage

- The core type pluggin exports is the `Plugin<I, O>`. It represents a plugin which accepts an input of type `I` and produces an output of type `O`.
- There are 2 types of plugins, a **function style plugin** and a **class style plugin** represented by the `FunctionPlugin<I, O>` and `ClassPlugin<I, O>` types resepectively.
- A function style plugin is really just a function which accepts a parameter of type `I` and returns a value of type `O`.
- A class style plugin is represented by a class which has an `execute` method which takes in a parameter of type `I` and returns a value of type `O`

## Example

```typescript
import { Plugin, execute } from 'pluggin';

const doublerPlugin: Plugin<number, number> = (input: number) => input * 2;
const result = execute(doublerPlugin, 25); // result = 25

const convertResultToString: Plugin<number, string> = (result: number) => `The result is ${result}`;
const message = execute(convertResultToString, 50); // message = 'The result is 50'
```

## Combining plugin executions

Plugins can be combined in series or parallel.

### Series

Combining plugins in series will cause them to be chained which means the type of the output of one plugin has to be the type of the input of the next plugin.

#### Example

```typescript
import { Plugin, series, execute } from 'pluggin';

interface MathProblem {
  operand1: number;
  operator: string;
  operand2: number;
}

const solve: Plugin<MathProblem, number> = (problem: MathProblem) => {
  const { operand1, operator, operand2 } = problem;

  switch (operator) {
    case '+':
      return operand1 + operand2;

    case '-':
      return operand1 - operand2;

    case '*':
      return operand1 * operand2;

    case '/':
      return operand1 / operand2;

    default:
      return NaN;
  }
};

const resultLogger: Plugin<number, void> = (result: number) => console.log(`The result is ${result}`);

const mathProblemSolver = series(solve, resultLogger);

execute(mathProblemSolver, {
  operand1: 25,
  operator: '+',
  operand2: 75,
}); // STDOUT: The result is 100

execute(mathProblemSolver, {
  operand1: 10,
  operator: '*',
  operand2: 5,
}); // STDOUT: The result is 50
```

### Parallel

Plugins can also be combined in parallel. The parallel plugins will have their outputs combined and the combined output gets passed on to the next plugin.

#### Example

```typescript
import { Plugin, series, parallel, execute } from 'pluggin';

interface MathQuestion {
  problem: MathProblem; // MathProblem interface from series section above.
  result: number;
}

interface LoggerOutput {
  messages: string[];
}

// Class style plugin
class Logger implements ClassPlugin<MathQuestion, LoggerOutput> {
  private id = (n: number) => Math.ceil(Math.random() * Math.pow(10, n)) % Math.pow(10, n);
  private current = () => `${new Date().getTime()}`;
  private logId = () => `${this.current()}-${this.id(6)}`;

  execute(question: MathQuestion): LoggerOutput {
    const { operand1, operator, operand2 } = question.problem;
    const { result } = question;

    return {
      [this.logId()]: `[LOGGER] ${operand1} ${operator} ${operand2} = ${result}`,
    };
  }
}

class RandomQuestionSolver implements ClassPlugin<MathQuestion[], MathQuestion> {
  private getRandomIndex = (n: number) => Math.ceil(Math.random() * n) % n;
  private chooseRandomQuestion = (questions: MathQuestion[]) => questions[this.getRandomIndex(questions.length)];

  execute(questions: MathQuestion[]) {
    const question = this.chooseRandomQuestion(questions);

    return {
      problem: question.problem,
      result: execute(solve, question.problem), // solve plugin from series section above.
    };
  }
}

const loggedMessages = execute(
  parallel(
    series(new RandomQuestionSolver(), new Logger()), 
    series(new RandomQuestionSolver(), new Logger())
  ),
  [
    { problem: { operand1: 25, operator: '+', operand2: 25 } },
    { problem: { operand1: 10, operator: '*', operand2: 5 } },
    { problem: { operand1: 121, operator: '/', operand2: 11 } },
  ],
);

console.log(loggedMessages);
/**
 * {
 *   '1588620157805-64667': '[LOGGER] 25 + 25 = 50',
 *   '1588620157805-912728': '[LOGGER] 10 * 5 = 50'
 * }
 **/
```
