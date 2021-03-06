import { isAsyncFunction } from 'expect-more';
import { printReceived } from 'jest-matcher-utils';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      /**
       * Asserts that ${value} is a function using async/await syntax.
       * @example
       * expect(async () => { await fetch('...') }).toBeAsyncFunction();
       */
      toBeAsyncFunction(): boolean;
    }
  }
}

export const toBeAsyncFunctionMatcher = () => {
  return {
    compare(value: any) {
      const pass = isAsyncFunction(value);
      const message = pass
        ? `expected ${printReceived(value)} not to be a function using async/await syntax`
        : `expected ${printReceived(value)} to be a \`Function\` using async/await syntax`;
      return { message, pass };
    },
  };
};

beforeAll(() => {
  jasmine.addMatchers({
    toBeAsyncFunction: toBeAsyncFunctionMatcher,
  });
});
