import { describe, expect, it } from "vitest";
import { compareBy } from "./compareBy";
import { max, maxWith, min, minWith } from "./minmax";

describe("max", () => {
	it("works with a single list argument", () => {
		expect(max([2, 3, 1])).toBe(3);
	});

	it("works with multiple arguments", () => {
		expect(max(2, 3, 1)).toBe(3);
	});

	it("does not type-check with zero arguments", () => {
		// @ts-expect-error
		expect(() => max()).toThrow(TypeError);
	});
});

describe("min", () => {
	it("works with a single list argument", () => {
		expect(min([2, 1, 3])).toBe(1);
	});

	it("works with multiple arguments", () => {
		expect(min(2, 1, 3)).toBe(1);
	});

	it("does not type-check with zero arguments", () => {
		// @ts-expect-error
		expect(() => min()).toThrow(TypeError);
	});
});

describe("maxWith", () => {
	it("throws TypeError when given an empty list", () => {
		expect(() => {
			maxWith([], (a, b) => a);
		}).toThrow(TypeError);
	});

	it("returns the max value using a comparator", () => {
		const result = maxWith([{ a: 2 }, { a: 3 }, { a: 1 }], compareBy("a"));

		expect(result).toEqual({ a: 3 });
	});

	it("prefers earlier values", () => {
		const result = maxWith(
			[
				{ a: 1, b: 1 },
				{ a: 1, b: 2 },
			],
			compareBy("a"),
		);

		expect(result).toEqual({ a: 1, b: 1 });
	});

	it("works with generators", () => {
		// @ts-expect-error
		type T = BuiltinIterator<string>;
		const iter = (function* () {
			yield 2;
			yield 3;
			yield 1;
		})();
		// @ts-expect-error
		const result = maxWith(iter, (a, b) => a - b);

		expect(result).toBe(3);
	});

	it("does not yet type-check with BuiltinIterator type", () => {
		const iter = (function* () {
			yield 2;
			yield 3;
			yield 1;
		})();
		// @ts-expect-error
		maxWith(iter, (a, b) => a - b);
	});
});

describe("minWith", () => {
	it("throws TypeError when given an empty list", () => {
		expect(() => {
			minWith([], (a, b) => a);
		}).toThrow(TypeError);
	});

	it("returns the min value using a comparator", () => {
		const result = minWith([{ a: 2 }, { a: 1 }, { a: 3 }], compareBy("a"));

		expect(result).toEqual({ a: 1 });
	});

	it("prefers earlier values", () => {
		const result = maxWith(
			[
				{ a: 1, b: 2 },
				{ a: 1, b: 1 },
			],
			compareBy("a"),
		);

		expect(result).toEqual({ a: 1, b: 2 });
	});
});
