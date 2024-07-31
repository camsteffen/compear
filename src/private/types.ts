import type { Comparator } from "../Comparator";

export type MergeComparators<T extends Comparator<any>[]> = Comparator<
	MergeComparatorInputs<T>
>;

export type MergeComparatorInputs<T extends Comparator<any>[]> = keyof {
	[E in T[number] as E extends Comparator<infer U> ? U : never]: any;
};
