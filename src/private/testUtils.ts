export type Equals<T, U> = (<G>() => G extends T ? 0 : 1) extends <
	G,
>() => G extends U ? 0 : 1
	? true
	: false;

export function assertType<T extends true>() {}

export function subtract(a: number, b: number): number {
	return a - b;
}
