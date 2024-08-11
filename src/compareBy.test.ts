import { describe, expect, it } from "vitest";
import type { Comparator } from "./Comparator";
import { reverseOrder } from "./comparators";
import { compareBy, compareByDesc } from "./compareBy";
import { type Equals, assertType, subtract } from "./private/testUtils";

describe("compareBy", () => {
	describe("when given a string key", () => {
		it("compares objects by the given key", () => {
			const comparator = compareBy("a");

			expect(comparator({ a: 0 }, { a: 1 })).toBe(-1);
			expect(comparator({ a: 1 }, { a: 0 })).toBe(1);
			expect(comparator({ a: 0 }, { a: 0 })).toBe(0);
		});

		it("does not type check if the property is optional", () => {
			const comparator = compareBy("a");

			const x = { a: 1 } as { a?: number };
			// @ts-expect-error
			comparator(x, x);
		});

		it("compiles with a single type parameter for the key type", () => {
			const comparator = compareBy<"a">("a");

			assertType<Equals<typeof comparator, Comparator<{ a: unknown }>>>();
		});
	});

	describe("when given a function selector", () => {
		it("compares objects by the output of the function", () => {
			const comparator = compareBy((s: unknown) => s === "a");

			expect(comparator("a", "a")).toBe(0);
			expect(comparator("b", "c")).toBe(0);
			expect(comparator("a", "b")).toBe(1);
		});

		describe("when given a comparator", () => {
			it("requires the input type of the comparator to extend the return type of the selector", () => {
				// @ts-expect-error
				compareBy(
					() => ({ a: 1 }),
					(a: string, b: string) => 0,
				);
			});

			it("infers the input type of the comparator from the return type of the selector", () => {
				compareBy(
					(): "foo" => "foo",
					(a, b) => {
						assertType<Equals<typeof a, "foo">>();
						assertType<Equals<typeof a, typeof b>>();
						return 0;
					},
				);
			});

			it("allows the comparator type to be more general than the selector output", () => {
				compareBy((): 1 => 1, subtract);
				compareBy(
					() => ({ x: 1, y: 1 }),
					(a: { x: number }, b: { x: number }) => 1,
				);
			});
		});
	});

	describe("when given a number literal selector", () => {
		// this required a workaround for https://github.com/microsoft/TypeScript/issues/59489
		describe("when not given a comparator", () => {
			it("can compare strings", () => {
				compareBy(0)("a", "a");
				compareBy<0>(0)("a", "a");
			});
		});

		describe("when given a non-string comparator", () => {
			it("cannot compare strings", () => {
				// @ts-expect-error
				compareBy(0, (x: number, y: number) => x - y)("", "");
			});
		});
	});

	it("works when building nested comparators", () => {
		const list = [{ a: { b: 3 } }, { a: { b: 1 } }, { a: { b: 2 } }];
		const result = list.sort(compareBy("a", compareBy("b", reverseOrder)));

		expect(result).toEqual([{ a: { b: 3 } }, { a: { b: 2 } }, { a: { b: 1 } }]);
	});
});

describe("compareByDesc", () => {
	describe("when given just a selector", () => {
		it("compares in descending order", () => {
			const result = [{ a: 1 }, { a: 3 }, { a: 2 }].sort(compareByDesc("a"));

			expect(result).toEqual([{ a: 3 }, { a: 2 }, { a: 1 }]);
		});
	});

	describe("when given a selector and a comparator", () => {
		it("compares in descending order", () => {
			const result = [{ a: 1 }, { a: 3 }, { a: 2 }].sort(
				compareByDesc("a", (a: number, b: number) => a - b),
			);

			expect(result).toEqual([{ a: 3 }, { a: 2 }, { a: 1 }]);
		});
	});
});
