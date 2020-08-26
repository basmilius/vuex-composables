import type { ActionContext, CommitOptions, DispatchOptions, Module, Payload, Store } from "vuex";

export interface LActionContext<Actions, Getters, Mutations, State, RootState> extends ActionContext<State, RootState>
{
	commit: LCommit<Mutations>;
	dispatch: LDispatch<Actions>;
	getters: Getters;
}

export interface LCommit<Mutations>
{
	// @ts-ignore
	<K extends keyof Mutations>(mutation: K, payload?: Parameters<Mutations[K]>[0], options?: CommitOptions): Promise<void> | void;
	<P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}

export interface LDispatch<Actions>
{
	// @ts-ignore
	<K extends keyof Actions>(action: K, payload?: Parameters<Actions[K]>[0], options?: DispatchOptions): Promise<any>;
	<P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
}

export interface LModule<Actions, Getters, Mutations, State, RootState = State> extends Module<State, RootState>
{
	actions: LActions<Actions, Getters, Mutations, State, RootState>;
	getters: LGetters<Getters, State, RootState>;
	mutations: LMutations<Mutations, State>;
}

export type LAction<Actions, Getters, Mutations, State, RootState, PayloadType> =
	(this: Store<RootState>, injectee: LActionContext<Actions, Getters, Mutations, State, RootState>, payload: PayloadType) => Promise<void> | void;

export type LActions<Actions, Getters, Mutations, State, RootState> =
// @ts-ignore
	{ [Key in keyof Actions]: LAction<Actions, Getters, Mutations, State, RootState, Parameters<Actions[Key]>[0]>; };

export type LGetter<Getters, State, RootState, ReturnType> =
	(state: State, getters: Getters, rootState: RootState) => ReturnType;

export type LGetters<Getters, State, RootState> =
	{ [Key in keyof Getters]: LGetter<Getters, State, RootState, Getters[Key]>; };

export type LMutation<State, PayloadType> =
	(state: State, payload: PayloadType) => void;

export type LMutations<Mutations, State> =
// @ts-ignore
	{ [Key in keyof Mutations]: LMutation<State, Parameters<Mutations[Key]>[0]>; };
