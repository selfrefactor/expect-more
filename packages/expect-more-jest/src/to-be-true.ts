import { isTrue } from 'expect-more';
import { printReceived } from 'jest-matcher-utils';
import { createResult } from './lib/create-result';

declare global {
  namespace jest {
    interface Matchers<R, T> {
      /**
       * Asserts that ${value} is `true` or `new Boolean(true)`.
       * @example
       * expect(true).toBeTrue();
       */
      toBeTrue(): R;
    }
    interface Expect {
      /**
       * Asserts that ${value} is `true` or `new Boolean(true)`.
       * @example
       * expect(true).toEqual(
       *   expect.toBeTrue()
       * );
       */
      toBeTrue<T>(): JestMatchers<T>;
    }
  }
}

export const toBeTrueMatcher = (value: any) =>
  createResult({
    message: () => `expected ${printReceived(value)} to be true or Boolean(true)`,
    notMessage: () => `expected ${printReceived(value)} not to be true or Boolean(true)`,
    pass: isTrue(value),
  });

expect.extend({ toBeTrue: toBeTrueMatcher });
