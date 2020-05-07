import { AsyncPluggin, AsyncClassPluggin, executeAsync, seriesAsync, parallelAsync } from '../src';

describe('Plugin Operations', () => {
  describe('Plugins without side-effects', () => {
    describe('For performing mathematical transform operations', () => {
      let doubler: (input: number) => Promise<number>;
      let arrayDoubler: (input: number[]) => Promise<number[]>;

      beforeEach(() => {
        doubler = (number): Promise<number> => Promise.resolve(number * 2);
        arrayDoubler = (numbers): Promise<number[]> => Promise.resolve(numbers.map((number) => number * 2));
      });

      it('Should double the input', async () => {
        const input = 25;
        const expectedResult = 50;
        const actualResult = await executeAsync(doubler, input);

        expect(actualResult).toBe(expectedResult);
      });

      it('Should double all elements in array', async () => {
        const input = [2, 4, 8];
        const expectedResult = [4, 8, 16];
        const actualResult = await executeAsync(arrayDoubler, input);

        expect(actualResult).toEqual(expectedResult);
      });
    });

    describe('For chaining operations to transform input to another type', () => {
      let doubler: (input: number) => Promise<number>;
      let reporter: (input: number) => Promise<string>;

      beforeEach(() => {
        doubler = (number): Promise<number> => Promise.resolve(number * 2);
        reporter = (number): Promise<string> => Promise.resolve(`The result is ${number}`);
      });

      it('Should transform number result to result string', async () => {
        const input = 25;
        const expectedResult = 'The result is 50';
        const actualResult = await executeAsync(reporter, await executeAsync(doubler, input));

        expect(actualResult).toEqual(expectedResult);
      });

      it('Should transform number result to result string using combined plugin', async () => {
        const input = 25;
        const expectedResult = 'The result is 50';
        const combinedPlugin = seriesAsync(doubler, reporter);
        const actualResult = await executeAsync(combinedPlugin, input);

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

    let doubler: AsyncClassPluggin<MathInput, void>;
    let finish: AsyncPluggin<MathInput, void>;
    let report: AsyncClassPluggin<MathInput, void>;

    interface ParallelProcessing {
      result1?: string;
      result2?: string;
      result3?: string;
      output?: string;
    }

    let result1: AsyncPluggin<void, ParallelProcessing>;
    let result2: AsyncPluggin<void, ParallelProcessing>;
    let result3: AsyncPluggin<void, ParallelProcessing>;
    let output: AsyncPluggin<ParallelProcessing, string>;

    beforeEach(() => {
      doubler = {
        execute(input: MathInput): Promise<void> {
          input.intermediate = input.intermediate || input.input;
          input.intermediate *= 2;

          return Promise.resolve();
        },
      };

      finish = (input: MathInput): Promise<void> => {
        input.result = input.intermediate;

        return Promise.resolve();
      };

      report = {
        execute(input: MathInput): Promise<void> {
          input.resultString = `The result is ${input.result}`;

          return Promise.resolve();
        },
      };

      result1 = (): Promise<ParallelProcessing> => Promise.resolve({ result1: '[This is result 1]' });
      result2 = (): Promise<ParallelProcessing> => Promise.resolve({ result2: '[This is result 2]' });
      result3 = (): Promise<ParallelProcessing> => Promise.resolve({ result3: '[This is result 3]' });
      output = (result: ParallelProcessing): Promise<string> =>
        Promise.resolve(`${result.result1} ${result.result2} ${result.result3}`);
    });

    it('Should transform context object passing through pipeline', async () => {
      const input: MathInput = { input: 25 };
      const expectedResult: MathInput = {
        input: 25,
        intermediate: 50,
        result: 50,
        resultString: 'The result is 50',
      };

      const resultStringExtractor = (input: MathInput): Promise<string> =>
        Promise.resolve(input.resultString || 'No Result');
      const logger = (resultString: string): Promise<void> => Promise.resolve();

      const wrappedLogger = seriesAsync(resultStringExtractor, logger);

      const joinedPlugin = parallelAsync(doubler, finish, report, wrappedLogger);
      await executeAsync(joinedPlugin, input);

      expect(input).toEqual(expectedResult);
    });

    it('Should be able to execute independent tasks in parallel', async () => {
      const expectedResult1 = '[This is result 1]';
      const expectedResult2 = '[This is result 2]';
      const expectedResult3 = '[This is result 3]';
      const expectedOutput = `${expectedResult1} ${expectedResult2} ${expectedResult3}`;

      const outputPlugin = seriesAsync(parallelAsync(result1, result2, result3), output);

      const actualOutput = await executeAsync(outputPlugin, void 0);

      expect(actualOutput).toEqual(expectedOutput);
    });
  });
});
