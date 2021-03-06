import { isArrayOfStrings } from 'expect-more';
import { printExpected } from 'jest-matcher-utils';
import { getIn } from './lib/get-in';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      /**
       * Asserts that ${value} is an `Array` containing only `String` values.
       * @example
       * expect({ child: { grandchild: ['we', 'are', 'all', 'strings'] } }).toHaveArrayOfStrings('child.grandchild');
       */
      toHaveArrayOfStrings(propPath: string): boolean;
    }
  }
}

export const toHaveArrayOfStringsMatcher = () => {
  return {
    compare(value: any, propPath: string) {
      const pass = isArrayOfStrings(getIn(propPath.split('.'), value));
      const message = pass
        ? `expected value at '${printExpected(
            propPath,
          )}' not to be a non-empty array, containing only strings`
        : `expected value at '${printExpected(
            propPath,
          )}' to be a non-empty array, containing only strings`;
      return { message, pass };
    },
  };
};

beforeAll(() => {
  jasmine.addMatchers({
    toHaveArrayOfStrings: toHaveArrayOfStringsMatcher,
  });
});
