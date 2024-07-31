import { describe, expect, it } from "vitest";
import type { Comparator } from "./Comparator";
import { compareBy } from "./compareBy";
import { compareWith } from "./compareWith";

describe("compareWith", () => {
	describe("when given zero comparators", () => {
		it("throws a TypeError", () => {
			expect(() => compareWith()).toThrow(TypeError);
		});

		it("has compile-time return type of Comparator<never>", () => {
			expect(() => {
				const comparator = compareWith();
				comparator satisfies Comparator<never>;
			}).toThrow();
		});
	});

	describe("when given a single comparator", () => {
		it("works", () => {
			const list = ["do", "re", "mi", "fa", "so"];
			const result = list.sort(compareWith(compareBy(1)));

			expect(result).toEqual(["fa", "re", "mi", "do", "so"]);
		});
	});

	describe("when given multiple comparators", () => {
		it("compares with each selector in order", () => {
			const list = [
				{ a: 1, b: 1 },
				{ a: 0, b: 2 },
				{ a: 1, b: 0 },
			];
			const result = list.sort(compareWith(compareBy("a"), compareBy("b")));

			expect(result).toEqual([
				{ a: 0, b: 2 },
				{ a: 1, b: 0 },
				{ a: 1, b: 1 },
			]);
		});
	});

	describe("when given an array of comparators with spread operator", () => {
		it("type checks", () => {
			const comparators: Comparator<unknown>[] = [];
			if (comparators.length) {
				compareWith(...comparators);
			}
		});
	});
});
