import type { ComputedRef } from "vue";
import { computed } from "vue";
import { mapActions, mapGetters, mapMutations, useStore } from "vuex";

export * from "./types";

export type UseActions<T> = { readonly [Key in keyof T]: T[Key] };
export type UseGetters<T> = { readonly [Key in keyof T]: ComputedRef<T[Key]> };
export type UseMutations<T> = { readonly [Key in keyof T]: T[Key] };

export function useActions<T, K extends keyof T & string>(module: string, actions: K[]): UseActions<T>
{
	const mapped = callMapFunction(module, actions, mapActions);
	const result: any = {};
	const context = makeContext();

	for (let action in mapped)
		result[action] = mapped[action].bind(context);

	return result;
}

export function useGetters<T, K extends keyof T & string>(module: string, getters: K[]): UseGetters<T>
{
	const mapped = callMapFunction(module, getters, mapGetters);
	const result: any = {};
	const context = makeContext();

	for (let getter in mapped)
		result[getter] = computed(() => mapped[getter].call(context));

	return result;
}

export function useMutations<T, K extends keyof T & string>(module: string, mutations: K[]): UseMutations<T>
{
	const mapped = callMapFunction(module, mutations, mapMutations);
	const result: any = {};
	const context = makeContext();

	for (let mutation in mapped)
		result[mutation] = mapped[mutation].bind(context);

	return result;
}

function callMapFunction<T, Key extends string>(module: string, params: Key[], fn: Function): { [K in Key]: Function }
{
	if (module === "root")
		return fn(params);

	return fn(module, params);
}

function makeContext(): { $store: any; }
{
	return {
		$store: useStore()
	};
}
