import { describe, expect, it } from "vitest";
import { isIterable } from "./isIterable";

describe("isIterable", () => {
	it.each([
		{ value: null, expected: false },
		{ value: undefined, expected: false },
		{ value: 1, expected: false },
		{ value: 1n, expected: false },
		{ value: "hi", expected: false },
		{ value: [42], expected: true },
		{ value: testGenerator, expected: false },
		{ value: testGenerator(), expected: true },
		{ value: new Map(), expected: true },
		{ value: new Set(), expected: true },
	])("isIterable($value) -> $expected", ({ value, expected }) => {
		expect(isIterable(value)).toBe(expected);
	});

	function* testGenerator() {}
});
