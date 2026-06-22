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

<svelte:head>
	<title>Svelte App (App2)</title>
</svelte:head>

<div
	style="
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f4f6f8;
		font-family: Arial, sans-serif;
	"
>
	<div
		style="
			width: 420px;
			padding: 32px;
			border-radius: 16px;
			background: white;
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
			text-align: center;
		"
	>
		<h1 style="margin-bottom: 50px; color: #1f2937;">
			Svelte App
		</h1>

		{#if loggedIn}
			<div
				style="
					padding: 16px;
					border-radius: 12px;
					background: #ecfdf5;
					color: #065f46;
					margin-bottom: 20px;
				"
			>
				<strong>Authenticated</strong>

				<p style="margin: 8px 0 0;">
					Logged in as:
					<strong>{username}</strong>
				</p>
			</div>

			<button
				onclick={logout}
				style="
					width: 100%;
					padding: 12px;
					border: none;
					border-radius: 10px;
					background: #dc2626;
					color: white;
					font-size: 16px;
					cursor: pointer;
				"
			>
				Logout
			</button>
		{:else}
			<button
				onclick={login}
				style="
					width: 100%;
					padding: 12px;
					border: none;
					border-radius: 10px;
					background: #2563eb;
					color: white;
					font-size: 16px;
					cursor: pointer;
				"
			>
				Login with Keycloak
			</button>
		{/if}
	</div>
</div>
