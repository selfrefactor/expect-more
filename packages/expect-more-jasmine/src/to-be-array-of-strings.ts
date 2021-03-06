import { isArrayOfStrings } from 'expect-more';
import { printReceived } from 'jest-matcher-utils';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      /**
       * Asserts that ${value} is an `Array` containing only `String` values.
       * @example
       * expect(['we', 'are', 'all', 'strings']).toBeArrayOfStrings();
       */
      toBeArrayOfStrings(): boolean;
    }
  }
}

export const toBeArrayOfStringsMatcher = () => {
  return {
    compare(value: any) {
      const pass = isArrayOfStrings(value);
      const message = pass
        ? `expected ${printReceived(value)} not to be a non-empty array, containing only strings`
        : `expected ${printReceived(value)} to be a non-empty array, containing only strings`;
      return { message, pass };
    },
  };
};

beforeAll(() => {
  jasmine.addMatchers({
    toBeArrayOfStrings: toBeArrayOfStringsMatcher,
  });
});
