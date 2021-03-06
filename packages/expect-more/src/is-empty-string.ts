import { isString } from './is-string';

/**
 * Asserts that ${value} is a valid `String` containing no characters.
 * @param value ''
 * @matcherName toBeEmptyString
 * @memberMatcherName toHaveEmptyString
 * @matcherMessage expected ${value} to be an empty string or empty instance of
 * String
 * @matcherNotMessage expected ${value} not to be an empty string or empty
 * instance of String
 */
export const isEmptyString = (value: any): boolean => isString(value) && value.length === 0;
