import type { Comparator } from "./Comparator";
import { naturalOrder } from "./comparators";
import reverse from "./private/reverse";

/**
 * Creates a comparator that uses a selector to transform values before they are
 * compared.
 *
 * The selector may be either an object key (typically a string) or a function.
 *
 * A comparator may also be provided as the second argument to compare the
 * transformed values. Otherwise, {@link naturalOrder} will be used by default.
 *
 * @example Sort a list by a string key
 * ```javascript
 * const list = [
 *   { color: "red" },
 *   { color: "green" },
 *   { color: "blue" },
 * ];
 * // sorts the list by the color property alphabetically
 * list.sort(compareBy("color"));
 * ```
 *
 * @example Using a function selector and a comparator
 * ```javascript
 * const list = [
 *   { x: { y: 42 } },
 *   { x: { y: 93 } },
 *   { x: { y: 10 } },
 * ];
 * // sorts the list by the inner 'y' property in reverse order
 * list.sort(
 *   compareBy(
 *     (element) => element.x.y,
 *     reverseOrder,
 *   )
 * );
 * ```
 *
 * @param selector specifies how values will be transformed. This can either be a key value or a function.
 * @param comparator compares the transformed values
 * @returns a new comparator
 */
export function compareBy<
	S extends Selector,
	V extends SelectorOut<S> = SelectorOut<S>,
>(
	selector: S,
	comparator: Comparator<V> = naturalOrder,
): CompareBy<S, NoInfer<V>> {
	const select: (v: any) => V =
		typeof selector === "function" ? selector : (value) => value[selector];
	return ((a: unknown, b: unknown) =>
		comparator(select(a), select(b))) as CompareBy<S, V>;
}

/**
 * Same as {@link compareBy} but orders in descending order
 *
 * @param selector specifies how values will be transformed. This can either be a key value or a function.
 * @param comparator compares the transformed values
 * @returns a new comparator
 */
export function compareByDesc<
	S extends Selector,
	V extends SelectorOut<S> = SelectorOut<S>,
>(
	selector: S,
	comparator: Comparator<V> = naturalOrder,
): CompareBy<S, NoInfer<V>> {
	return compareBy(selector, reverse(comparator));
}

type AnyKey = keyof any;
type Selector = AnyKey | SelectorFn;
type SelectorFn<T = any, U = any> = (value: T) => U;
type SelectorOut<T> = T extends SelectorFn<any, infer U> ? U : unknown;

type CompareBy<S extends Selector, V> =
	| (S extends SelectorFn<infer U> ? Comparator<U> : never)
	| (S extends AnyKey
			? Comparator<
					| Record<S, V>
					// https://github.com/microsoft/TypeScript/issues/59489
					| (S extends number ? (string extends V ? string : never) : never)
				>
			: never);
