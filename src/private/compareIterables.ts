import type { Comparator } from "../Comparator";

export default function compareIterables<T>(
	a: Iterable<T>,
	b: Iterable<T>,
	comparator: Comparator<T>,
): number {
	return withIterable(a, (nextA) => {
		return withIterable(b, (nextB) => {
			while (true) {
				const resultA = nextA();
				const resultB = nextB();
				if (resultA.done) return resultB.done ? 0 : -1;
				if (resultB.done) return 1;
				const n = comparator(resultA.value, resultB.value);
				if (n) return n;
			}
		});
	});
}

function withIterable<T, R>(
	iterable: Iterable<T>,
	callback: (next: () => IteratorResult<T, unknown>) => R,
): R {
	const iterator = iterable[Symbol.iterator]();
	let done: boolean | undefined;
	function next() {
		done = true;
		const result = iterator.next();
		done = result.done;
		return result;
	}
	try {
		return callback(next);
	} finally {
		if (!done) iterator.return?.();
	}
}
