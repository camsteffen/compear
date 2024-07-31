import type { Comparator } from "../Comparator";

export default function reverse<T>(comparator: Comparator<T>): Comparator<T> {
	return (a, b) => comparator(b, a);
}
