<script>
	import '../app.css';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	async function logout() {
		await supabase.auth.signOut();
	}
</script>

<svelte:head>
	<title>Enceladus-1: the DALL-E wrapper</title>
	<meta name="description" content="It's on Enceladus" />
</svelte:head>

<div class="font-mono min-h-screen flex flex-col">
	<header class="flex justify-between items-center py-6 px-12">
		<a class="text-4xl font-bold tracking-wide" href="/">Enceladus-1</a>
		{#if session}
			<div>
				<a href="/dashboard" class="text-lg tracking-tighter border-2 border-black p-1">Dashboard</a
				>
				<button on:click={logout} class="text-lg tracking-tighter border-2 border-black p-1"
					>Sign Out</button
				>
			</div>
		{:else}
			<a href="/login" class="text-lg tracking-tighter border-2 border-black p-1">Login or Signup</a
			>
		{/if}
	</header>

	<slot />
</div>
