import { describe, expect, it, vi } from "vitest";
import compareIterables from "./compareIterables";
import { subtract } from "./testUtils";

function mockIterable<T>(values: T[]) {
	const it = {
		[Symbol.iterator]() {
			return this;
		},
		next: vi.fn().mockReturnValue({ done: true }),
		return: vi.fn(),
	};
	for (const value of values) {
		it.next.mockReturnValueOnce({ done: false, value });
	}
	return it as typeof it & Iterable<T>;
}

describe("compareIterables", () => {
	it("considers shorter iterables to be smaller", () => {
		expect(compareIterables([], [1], subtract)).toBe(-1);
		expect(compareIterables([1], [], subtract)).toBe(1);
	});

	it("considers iterables with equal elements to be equal", () => {
		expect(compareIterables([1], [1], subtract)).toBe(0);
	});

	it("returns the result of the first non-equal elements", () => {
		expect(compareIterables([1, 2, 5], [1, 3], subtract)).toBe(-1);
	});

	it("calls iterator.return() if the iterable is not exhausted", () => {
		const iter = mockIterable([1, 2]);

		compareIterables(iter, [1], (a, b) => a - b);

		expect(iter.return).toHaveBeenCalledOnce();
	});

	it("does not call iterator.return() if the iterable is exhausted", () => {
		const iter = mockIterable([1]);

		compareIterables(iter, [1, 2], (a, b) => a - b);

		expect(iter.return).not.toHaveBeenCalled();
	});

	it("does call iterator.return() if the iterable's next() throws", () => {
		const iter = mockIterable([]);
		iter.next.mockImplementation(() => {
			throw "erp";
		});

		expect(() => {
			compareIterables(iter, [1], subtract);
		}).toThrow("erp");

		expect(iter.return).not.toHaveBeenCalled();
	});
});
