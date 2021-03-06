import { startsWith } from 'expect-more';
import { printExpected } from 'jest-matcher-utils';
import { getIn } from './lib/get-in';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      /**
       * Assert value is a string whose leading characters are equal to `other`.
       * @example
       * expect({ child: { grandchild: 'JavaScript' } }).toHaveStartingWith('child.grandchild', 'Java');
       */
      toHaveStartingWith(propPath: string, otherString: string): boolean;
    }
  }
}

export const toHaveStartingWithMatcher = () => {
  return {
    compare(value: any, propPath: string, otherString: string) {
      const pass = startsWith(otherString, getIn(propPath.split('.'), value));
      const message = pass
        ? `expected value at '${printExpected(propPath)}' not to start with ${printExpected(
            otherString,
          )}`
        : `expected value at '${printExpected(propPath)}' to start with ${printExpected(
            otherString,
          )}`;
      return { message, pass };
    },
  };
};

beforeAll(() => {
  jasmine.addMatchers({
    toHaveStartingWith: toHaveStartingWithMatcher,
  });
});
