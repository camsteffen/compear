import type { Comparator } from "./Comparator";
import { compareWith } from "./compareWith";
import compareIterables from "./private/compareIterables";
import type { MergeComparatorInputs } from "./private/types";

/**
 * Creates a comparator that compares iterables (e.g. arrays) in lexicographic
 * order.
 *
 * You must provide a comparator (such as `naturalOrder`) for comparing
 * corresponding pairs of elements. You can provide multiple comparator
 * arguments, which are combined similarly to {@link compareWith}.
 *
 * The returned comparator expects two [iterables]. It compares their
 * corresponding elements pairwise until a non-equal pair is found. If either
 * iterable ends before a non-equal pair is found, that shorter iterable is
 * considered less than the other. If all elements are equal, the iterables are
 * considered equal.
 *
 * [iterables]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators#iterables
 *
 * @example
 * ```javascript
 * const people = [
 *   { firstName: "Fred", lastName: "Johnson" },
 *   { firstName: "Calvin", lastName: "Hobbes" },
 * ];
 * // sort list of people by full name
 * people.sort(
 *   compareBy(
 *     (person) => [person.firstName, person.lastName],
 *     compareEachWith(String.prototype.localeCompare),
 *   );
 * );
 * ```
 *
 * @param comparators used to compare corresponding elements between two
 * iterables
 * @returns a new comparator that compares iterables
 */
export function compareEachWith<T extends Comparator<any>[]>(
	...comparators: T
): Comparator<Iterable<MergeComparatorInputs<T>>> {
	const comparator = compareWith(...comparators);
	return (a, b) => compareIterables(a, b, comparator);
}
