import { isAfter } from 'expect-more';
import { printExpected, printReceived } from 'jest-matcher-utils';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      /**
       * Asserts that ${value} is a valid instance of `Date` whose value occurs after that of ${otherDate}.
       * @example
       * expect(new Date('2020-01-01')).toBeAfter(new Date('2019-12-31'));
       */
      toBeAfter(otherDate: Date): boolean;
    }
  }
}

export const toBeAfterMatcher = () => {
  return {
    compare(value: any, otherDate: Date) {
      const pass = isAfter(otherDate, value);
      const message = pass
        ? `expected ${printReceived(
            value,
          )} not to be an instance of Date, occurring after ${printExpected(otherDate)}`
        : `expected ${printReceived(
            value,
          )} to be an instance of Date, occurring after ${printExpected(otherDate)}`;
      return { message, pass };
    },
  };
};

beforeAll(() => {
  jasmine.addMatchers({
    toBeAfter: toBeAfterMatcher,
  });
});
