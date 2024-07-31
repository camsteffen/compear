import { maxWith, minWith } from "./minmax";

/**
 * Function that determines the order of two values.
 *
 * A comparator returns one of the following:
 *  * A negative number if `a` is less than `b`
 *  * A positive number if `a` is greater than `b`
 *  * Zero if the two arguments are equal
 *
 * Typical usages for a comparator include:
 *  * Sorting a list with [Array.prototype.sort] or [Array.prototype.toSorted]
 *  * Finding the smallest or largest value using {@link minWith} or
 *    {@link maxWith}
 *
 * There are some comparator functions built-in with JavaScript. For example:
 *  * [Intl.Collator.prototype.compare]
 *  * [String.prototype.localeCompare]
 *
 * [Array.prototype.sort]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * [Array.prototype.toSorted]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
 * [Intl.Collator.prototype.compare]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare
 * [String.prototype.localeCompare]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
 */
export type Comparator<T> = (a: T, b: T) => number;
