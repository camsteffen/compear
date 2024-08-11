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
export function compareBy<K extends AnyKey, V = unknown>(
	selector: K,
	comparator?: Comparator<V>,
): CompareByKey<K, V>;

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
export function compareBy<T, U>(
	selector: SelectorFn<T, U>,
	comparator?: Comparator<U>,
): Comparator<T>;

export function compareBy(
	selector: AnyKey | SelectorFn,
	comparator: Comparator<unknown> = naturalOrder,
): Comparator<unknown> {
	const select =
		typeof selector === "function" ? selector : (value: any) => value[selector];
	return (a: unknown, b: unknown) => comparator(select(a), select(b));
}

/**
 * Same as {@link compareBy} but orders in descending order
 *
 * @param selector specifies how values will be transformed. This can either be a key value or a function.
 * @param comparator compares the transformed values
 * @returns a new comparator
 */
export function compareByDesc<K extends AnyKey, V = unknown>(
	selector: K,
	comparator?: Comparator<V>,
): CompareByKey<K, V>;

/**
 * Same as {@link compareBy} but orders in descending order
 *
 * @param selector specifies how values will be transformed. This can either be a key value or a function.
 * @param comparator compares the transformed values
 * @returns a new comparator
 */
export function compareByDesc<T, U>(
	selector: SelectorFn<T, U>,
	comparator?: Comparator<U>,
): Comparator<T>;

export function compareByDesc(
	selector: AnyKey | SelectorFn,
	comparator: Comparator<unknown> = naturalOrder,
): Comparator<any> {
	return compareBy(selector as any, reverse(comparator));
}

type AnyKey = keyof any;

type SelectorFn<T = any, U = any> = (value: T) => U;

type CompareByKey<K extends AnyKey, V> = Comparator<
	Record<K, V> | MaybeCompareStringFromIndex<K, V>
>;

type MaybeCompareStringFromIndex<K, V> = K extends number
	? string extends V
		? string
		: never
	: never;
