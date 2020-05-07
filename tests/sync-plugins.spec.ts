import { Pluggin, ClassPluggin, execute, series, parallel } from '../src';

describe('Plugin Operations', () => {
  describe('Plugins without side-effects', () => {
    describe('For performing mathematical transform operations', () => {
      let doubler: (input: number) => number;
      let arrayDoubler: (input: number[]) => number[];

      beforeEach(() => {
        doubler = (number) => number * 2;
        arrayDoubler = (numbers) => numbers.map(doubler);
      });

      it('Should double the input', () => {
        const input = 25;
        const expectedResult = 50;
        const actualResult = execute(doubler, input);

        expect(actualResult).toBe(expectedResult);
      });

      it('Should double all elements in array', () => {
        const input = [2, 4, 8];
        const expectedResult = [4, 8, 16];
        const actualResult = execute(arrayDoubler, input);

        expect(actualResult).toEqual(expectedResult);
      });
    });

    describe('For chaining operations to transform input to another type', () => {
      let doubler: (input: number) => number;
      let reporter: (input: number) => string;

      beforeEach(() => {
        doubler = (number) => number * 2;
        reporter = (number) => `The result is ${number}`;
      });

      it('Should transform number result to result string', () => {
        const input = 25;
        const expectedResult = 'The result is 50';
        const actualResult = execute(reporter, execute(doubler, input));

        expect(actualResult).toEqual(expectedResult);
      });

      it('Should transform number result to result string using combined plugin', () => {
        const input = 25;
        const expectedResult = 'The result is 50';
        const combinedPlugin = series(doubler, reporter);
        const actualResult = execute(combinedPlugin, input);

        expect(actualResult).toEqual(expectedResult);
      });
    });
  });

  describe('Plugins with side-effects', () => {
    interface MathInput {
      input: number;
      intermediate?: number;
      result?: number;
      resultString?: string;
    }

    let doubler: ClassPluggin<MathInput, void>;
    let finish: Pluggin<MathInput, void>;
    let report: ClassPluggin<MathInput, void>;

    interface ParallelProcessing {
      result1?: string;
      result2?: string;
      result3?: string;
      output?: string;
    }

    let result1: Pluggin<void, ParallelProcessing>;
    let result2: Pluggin<void, ParallelProcessing>;
    let result3: Pluggin<void, ParallelProcessing>;
    let output: Pluggin<ParallelProcessing, string>;

    beforeEach(() => {
      doubler = {
        execute(input: MathInput) {
          input.intermediate = input.intermediate || input.input;
          input.intermediate *= 2;
        },
      };

      finish = (input: MathInput) => {
        input.result = input.intermediate;
      };

      report = {
        execute(input: MathInput) {
          input.resultString = `The result is ${input.result}`;
        },
      };

      result1 = () => ({ result1: '[This is result 1]' });
      result2 = () => ({ result2: '[This is result 2]' });
      result3 = () => ({ result3: '[This is result 3]' });
      output = (result: ParallelProcessing) => `${result.result1} ${result.result2} ${result.result3}`;
    });

    it('Should transform context object passing through pipeline', () => {
      const input: MathInput = { input: 25 };
      const expectedResult: MathInput = {
        input: 25,
        intermediate: 50,
        result: 50,
        resultString: 'The result is 50',
      };

      const resultStringExtractor = (input: MathInput): string => input.resultString || 'No Result';
      const logger = (resultString: string) => {};

      const wrappedLogger = series(resultStringExtractor, logger);

      const joinedPlugin = parallel(doubler, finish, report, wrappedLogger);
      execute(joinedPlugin, input);

      expect(input).toEqual(expectedResult);
    });

    it('Should be able to execute independent tasks in parallel', () => {
      const expectedResult1 = '[This is result 1]';
      const expectedResult2 = '[This is result 2]';
      const expectedResult3 = '[This is result 3]';
      const expectedOutput = `${expectedResult1} ${expectedResult2} ${expectedResult3}`;

      const outputPlugin = series(parallel(result1, result2, result3), output);

      const actualOutput = execute(outputPlugin, void 0);

      expect(actualOutput).toEqual(expectedOutput);
    });
  });
});
