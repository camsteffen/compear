import { describe, expect, it } from "vitest";
import type { Comparator } from "./Comparator";
import { compareBy } from "./compareBy";
import { compareEachWith } from "./compareEachWith";
import { subtract } from "./private/testUtils";

describe("compareEachWith", () => {
	describe("when given zero comparators", () => {
		it("throws a TypeError", () => {
			expect(() => compareEachWith()).toThrow(TypeError);
		});

		it("has return type of Comparator<Iterable<never>>", () => {
			expect(() => {
				const comparator = compareEachWith();
				comparator satisfies Comparator<Iterable<never>>;
			}).toThrow();
		});
	});

	it("works with a given comparator", () => {
		const comparator = compareEachWith(subtract);

		expect(comparator([10], [2])).toBe(8);
	});

	it("works with multiple comparators", () => {
		const comparator = compareEachWith(compareBy("foo"), compareBy("bar"));

		expect(comparator([{ foo: 0, bar: 0 }], [{ foo: 0, bar: 1 }])).toBe(-1);
	});

	it("returns a comparator that throws a TypeError when given non-iterable arguments", () => {
		expect(() => {
			// @ts-expect-error
			compareEachWith()(1, 2);
		}).toThrow(TypeError);
	});
});
