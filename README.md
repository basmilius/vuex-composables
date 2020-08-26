<a href="https://bas.dev" target="_blank" rel="noopener">
	<img src="https://bas.dev/module/@bas/website/resource/image/logo.svg" alt="Bas Milius Logo" height="60" width="60" />
</a>

---

# Vuex Composables
A set of utility composables to use with Vuex stores and modules. These composables
create strongly typed references to your actions, getters and mutations in your
stores/modules.

#### ⚠️ Before using this library
You should create your own composables so everything will be strongly typed in
your code. You should create interfaces of your actions, getters and mutations 
and pass them to these functions.

#### 🧐 Example interfaces
```typescript
export interface AuthActions
{
	initialize(): Promise<void>;
	loadAuthenticatedUser(): Promise<void>;
	login(payload: LoginActionPayload): Promise<void>;
	setToken(token: string | null): void;
	setUser(user: GAuthenticatedUser | null): void;
}

export interface AuthGetters
{
	isAuthenticated: boolean;
	token: string | null;
	user: GAuthenticatedUser | null;
}

export interface AuthMutations
{
	updateToken(token: string | null): void;
	updateUser(user: GAuthenticatedUser | null): void;
}

export interface AuthState
{
	token: string | null;
	user: GAuthenticatedUser | null;
}
```

#### Implementation of useActions
```typescript
// Own composable that calls useActions()
export function useAuthActions<K extends keyof AuthActions>(actions: K[]): UseActions<AuthActions>
{
	return useActions<AuthActions, K>("auth", actions);
}

// Example of using that composable
defineComponent({
    setup()
    {
        const {loadAuthenticatedUser, login} = useAuthActions(["loadAuthenticatedUser", "login"]);
        return {loadAuthenticatedUser, login}
    }
});
```

#### Implementation of useGetters
```typescript
// Own composable that calls useGetters()
export function useAuthGetters<K extends keyof AuthGetters>(getters: K[]): UseGetters<AuthGetters>
{
	return useGetters<AuthGetters, K>("auth", getters);
}

// Example of using that composable
defineComponent({
    setup()
    {
        const {isAuthenticated, user} = useAuthGetters(["isAuthenticated", "user"]);
        return {isAuthenticated, user}
    }
});
```

#### Implementation of useMutations
```typescript
// Own composable that calls useGetters()
export function useAuthMutations<K extends keyof AuthMutations>(mutations: K[]): UseMutations<AuthMutations>
{
	return useMutations<AuthMutations, K>("auth", mutations);
}

// Example of using that composable
defineComponent({
    setup()
    {
        const {updateToken} = useAuthMutations(["updateToken"]);
        return {updateToken}
    }
});
```

---

*Created by [Bas Milius](https://bas.dev).*
