export function isIterable(value: unknown): value is Iterable<unknown> {
	return Boolean(
		typeof value === "object" && value && Symbol.iterator in value,
	);
}
