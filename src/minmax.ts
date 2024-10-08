import type { Comparator } from "./Comparator";
import { naturalOrder } from "./comparators";

/**
 * Finds the smallest value.
 *
 * Accepts either a single argument with a list of values or multiple
 * arguments as values.
 *
 * Values are compared using {@link naturalOrder}.
 *
 * @param values values to compare
 * @returns the smallest value
 * @throws {TypeError} thrown if `values` is empty
 */
export function min<T>(values: T[]): T;

/**
 * Finds the smallest value.
 *
 * Accepts either a single argument with a list of values or multiple
 * arguments as values.
 *
 * Values are compared using {@link naturalOrder}.
 *
 * @param first the first value to compare
 * @param second the first value to compare
 * @param rest any other values to compare
 * @returns the smallest value
 */
export function min<T>(first: T, second: T, ...rest: T[]): T;

export function min<T>(...args: T[] | [T[]]): T {
	const list = (args.length > 1 ? args : args[0]) as T[];
	return minWith(list, naturalOrder);
}

/**
 * Finds the largest value.
 *
 * Accepts either a single argument with a list of values or multiple
 * arguments as values.
 *
 * Values are compared using {@link naturalOrder}.
 *
 * @param values values to compare
 * @returns the largest value
 * @throws {TypeError} thrown if `values` is empty
 */
export function max<T>(values: T[]): T;

/**
 * Finds the largest value.
 *
 * Accepts either a single argument with a list of values or multiple
 * arguments as values.
 *
 * Values are compared using {@link naturalOrder}.
 *
 * @param first the first value to compare
 * @param second the first value to compare
 * @param rest any other values to compare
 * @returns the largest value
 */
export function max<T>(first: T, second: T, ...rest: T[]): T;

export function max<T>(...args: T[] | [T[]]): T {
	const list = (args.length > 1 ? args : args[0]) as T[];
	return maxWith(list, naturalOrder);
}

/**
 * Finds the smallest value using a comparator.
 *
 * @param values the list of values to compare
 * @param comparator compares the values
 * @returns the smallest value
 * @throws {TypeError} thrown if `values` is empty
 */
export function minWith<T>(values: T[], comparator: Comparator<T>): T {
	return values.reduce(minReducer(comparator));
}

/**
 * Finds the largest value using a comparator
 *
 * @param values the list of values to compare
 * @param comparator compares the values
 * @returns the largest value
 * @throws {TypeError} thrown if `values` is empty
 */
export function maxWith<T>(values: T[], comparator: Comparator<T>): T {
	return values.reduce(maxReducer(comparator));
}

function minReducer<T>(comparator: Comparator<T>): (a: T, b: T) => T {
	return (a, b) => (comparator(a, b) > 0 ? b : a);
}

function maxReducer<T>(comparator: Comparator<T>): (a: T, b: T) => T {
	return (a, b) => (comparator(a, b) < 0 ? b : a);
}
