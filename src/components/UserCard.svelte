<script>
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	// --- Props para la información del usuario ---
	export let user = {
		email: "drrclabx@gmail.com",
		initial: "L",
		name: "Labx",
		avatarBgColor: "bg-purple-600", // Un color diferente para este ejemplo
	};

	// --- Funciones para manejar los clics ---
	function handleManageAccount() {
		console.log("Navegando a la gestión de la cuenta...");
	}

	function handleAddAccount() {
		console.log("Abriendo el flujo para añadir cuenta...");
	}

	function handleSignOut() {
		alert("Cerrando sesión...");
	}

	function handleClose() {
		// Despacha un evento 'close' para que el componente padre pueda ocultar la tarjeta
		dispatch("close");
		console.log("Cerrando tarjeta...");
	}
</script>

<!-- Contenedor Principal -->
<div
	class="w-80 rounded-2xl bg-white shadow-xl border border-gray-200 font-sans text-gray-900 p-4 relative"
>
	<!-- Botón de Cierre -->
	<button
		on:click={handleClose}
		class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
		aria-label="Cerrar"
	>
		✕
	</button>

	<!-- Correo Electrónico -->
	<p class="text-xs text-gray-600 text-center mb-4">{user.email}</p>

	<!-- Información de la Cuenta -->
	<div class="flex flex-col items-center text-center">
		<div
			class={`w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl font-medium ${user.avatarBgColor}`}
		>
			{user.initial}
		</div>
		<h1 class="mt-3 text-xl font-medium">¡Hola, {user.name}!</h1>
		<a
			href="#"
			on:click|preventDefault={handleManageAccount}
			class="mt-2 text-sm text-blue-600 hover:underline"
		>
			Gestionar tu cuenta de Google
		</a>
	</div>

	<!-- Sección de Acciones de Usuario -->
	<div class="flex justify-around mt-6">
		<button
			on:click={handleAddAccount}
			class="flex flex-col items-center text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
		>
			<span class="text-2xl">👥</span>
			<!-- Icono de añadir persona -->
			<span class="mt-1">Añadir cuenta</span>
		</button>
		<button
			on:click={handleSignOut}
			class="flex flex-col items-center text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
		>
			<span class="text-2xl">↪️</span>
			<!-- Icono de salida -->
			<span class="mt-1">Cerrar sesión</span>
		</button>
	</div>

	<!-- Separador -->
	<hr class="my-4 border-gray-200" />

	<!-- Sección de Enlaces Legales -->
	<div class="text-center text-xs text-gray-600">
		<a href="#" class="hover:underline">Política de Privacidad</a>
		<span class="mx-2">|</span>
		<a href="#" class="hover:underline">Términos del Servicio</a>
	</div>
</div>

<style>
	/* Aseguramos que la fuente sans-serif se aplique correctamente */
	.font-sans {
		font-family:
			"Roboto",
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			"Helvetica Neue",
			Arial,
			sans-serif;
	}
</style>
