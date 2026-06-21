<script lang="ts">
	import { onMount } from 'svelte';
	import keycloak from '$lib/keycloak';

	let loggedIn = $state(false);
	let username = $state('');

	onMount(async () => {
		const auth = await keycloak.init({
			onLoad: 'check-sso',
			pkceMethod: 'S256'
		});

		loggedIn = auth;

		if (keycloak.tokenParsed) {
			username = keycloak.tokenParsed.preferred_username;
		}
	});

	function login() {
		keycloak.login({
			redirectUri: window.location.origin
		});
	}

	function logout() {
		keycloak.logout({
			redirectUri: window.location.origin
		});
	}
</script>

<h1>Svelte App (App2)</h1>

{#if loggedIn}
	<p>Logged in as: {username}</p>
	<button onclick={logout}>Logout</button>
{:else}
	<button onclick={login}>Login</button>
{/if}
