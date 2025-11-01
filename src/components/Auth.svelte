<script>
	// El componente recibe el perfil del usuario como una "prop"
	export let userProfile = null;

	// `isSignedIn` se deriva de si `userProfile` existe
	$: isSignedIn = !!userProfile;

	const GOOGLE_CLIENT_ID = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID;

	function handleSignIn() {
		const redirectUri = "http://localhost:4321/auth/callback";
		const scope = "openid profile email";
		const responseType = "code";
		const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
		window.location.href = authUrl;
	}

	async function handleSignOut() {
		// Llamamos a nuestra API para que el servidor borre la cookie
		await fetch("/api/logout", { method: "POST" });
		// Recargamos la página para que se actualice el estado de la sesión
		window.location.href = "/";
	}
</script>

<div class="auth-widget">
	{#if isSignedIn && userProfile}
		<div class="user-info">
			<img src={userProfile.picture} alt="User profile" class="profile-pic" />
			<span>{userProfile.name}</span>
			<button on:click={handleSignOut} data-i18n="signOut">Sign Out</button>
		</div>
	{:else}
		<button on:click={handleSignIn} data-i18n="signIn"
			>Sign in with Google</button
		>
	{/if}
</div>

<style>
	.auth-widget {
		position: absolute;
		top: 15px;
		right: 15px;
	}
	.user-info {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.profile-pic {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}
	button {
		background-color: #4285f4;
		color: white;
		border: none;
		padding: 8px 12px;
		border-radius: 4px;
		cursor: pointer;
	}
</style>
