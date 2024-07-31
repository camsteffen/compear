import type { Comparator } from "./Comparator";
import type { MergeComparators } from "./private/types";

/**
 * Creates a comparator from an ordered list of comparators.
 *
 * The returned comparator calls each given comparator in order until one
 * determines the values are not equal.
 *
 * @example
 * ```javascript
 * const list = [
 *   { foo: "bbb", bar: "yyy" },
 *   { foo: "aaa", bar: "xxx" },
 *   { foo: "bbb", bar: "xxx" },
 * ];
 * // sorts the list comparing by "foo" and then by "bar"
 * list.sort(
 *   compareWith(
 *     compareBy("foo"),
 *     compareBy("bar"),
 *   )
 * );
 * // Result:
 * // [
 * //   { foo: "aaa", bar: "xxx" },
 * //   { foo: "bbb", bar: "xxx" },
 * //   { foo: "bbb", bar: "yyy" },
 * // ]
 * ```
 *
 * @param comparators used in order to compare values
 * @returns a new comparator that uses the given comparators
 */
export function compareWith<T extends Comparator<any>[]>(
	...comparators: T
): MergeComparators<T> {
	const { length } = comparators;
	if (length === 0) throw new TypeError("must provide at least one comparator");
	if (length === 1) return comparators[0];
	return (a, b) => {
		for (const comparator of comparators) {
			const n = comparator(a, b);
			if (n) return n;
		}
		return 0;
	};
}
