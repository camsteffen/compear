import { describe, expect, it } from "vitest";
import {
	naturalOrder,
	nullsFirst,
	nullsLast,
	reverseOrder,
} from "./comparators";

describe("naturalOrder", () => {
	it("works", () => {
		expect(naturalOrder(1, 1)).toBe(0);
		expect(naturalOrder(1, 2)).toBe(-1);
		expect(naturalOrder(2, 1)).toBe(1);
		expect(naturalOrder("a", "a")).toBe(0);
		expect(naturalOrder("aa", "ab")).toBe(-1);
		expect(naturalOrder("ab", "aa")).toBe(1);
	});

	it("compares lists by elements", () => {
		expect(naturalOrder([10], [2])).toBe(1);
	});
});

describe("reverseOrder", () => {
	it("works", () => {
		expect(reverseOrder(1, 1)).toBe(0);
		expect(reverseOrder(1, 2)).toBe(1);
		expect(reverseOrder(2, 1)).toBe(-1);
		expect(reverseOrder("a", "a")).toBe(0);
		expect(reverseOrder("aa", "ab")).toBe(1);
		expect(reverseOrder("ab", "aa")).toBe(-1);
	});
});

describe("nullsFirst", () => {
	it("works", () => {
		for (const v of ["", -1, 0, 1, {}]) {
			expect(nullsFirst(null, v)).toBe(-1);
			expect(nullsFirst(v, null)).toBe(1);
		}
		expect(nullsFirst(null, null)).toBe(0);
		expect(nullsFirst(null, undefined)).toBe(0);
	});

	it("sorts null first", () => {
		const result = [42, null].sort(nullsFirst);
		expect(result).toEqual([null, 42]);
	});
});

describe("nullsLast", () => {
	it("works", () => {
		for (const v of ["", -1, 0, 1, {}]) {
			expect(nullsLast(null, v)).toBe(1);
			expect(nullsLast(v, null)).toBe(-1);
		}
		expect(nullsLast(null, null)).toBe(0);
		expect(nullsLast(null, undefined)).toBe(0);
	});

	it("sorts null last", () => {
		const result = [null, 42].sort(nullsLast);
		expect(result).toEqual([42, null]);
	});
});
