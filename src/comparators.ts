import { compareEachWith } from "./compareEachWith";
import { compareWith } from "./compareWith";
import compareIterables from "./private/compareIterables";
import { isIterable } from "./private/isIterable";
import reverse from "./private/reverse";

/**
 * The default comparator which orders values in ascending order.
 *
 * `naturalOrder` generally works well for comparing numbers, strings, Dates,
 * or lists of these values.
 *
 * If the values are both [iterables] (e.g. Array or Map), then they are
 * compared by their elements _recursively_ (see also {@link compareEachWith}).
 * Otherwise, values are compared using the `<` or `>` operators.
 *
 * [iterables]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators#iterables
 */
export function naturalOrder(a: unknown, b: unknown): number {
	if (a === b) return 0;
	if (isIterable(a) && isIterable(b))
		return compareIterables(a, b, naturalOrder);
	if ((a as any) < (b as any)) return -1;
	if ((a as any) > (b as any)) return 1;
	return 0;
}

/**
 * Comparator that orders values in reverse order.
 *
 * This is the opposite of {@link naturalOrder}.
 */
export const reverseOrder = reverse(naturalOrder);

/**
 * Comparator that orders null or undefined values before anything else.
 *
 * All non-null values will be considered equal. So consider using
 * {@link compareWith} to chain another comparator for comparing non-null
 * values.
 *
 * Note that {@link Array.sort} always sorts `undefined` values to the end.
 *
 * @example
 * ```javascript
 * nullsFirst(0, null) // -> 1
 * nullsFirst(null, "foo") // -> -1
 * nullsFirst(null, null) // -> 0
 * nullsFirst(null, undefined) // -> 0
 * ```
 */
export function nullsFirst(a: unknown, b: unknown): number {
	return naturalOrder(b == null, a == null);
}

/**
 * Comparator that orders null or undefined values after anything else.
 *
 * @see {@link nullsFirst}
 */
export function nullsLast(a: unknown, b: unknown): number {
	return naturalOrder(a == null, b == null);
}
