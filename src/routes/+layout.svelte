<script>
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Enceladus-1: the DALL-E wrapper</title>
	<meta name="description" content="It's on Enceladus" />
</svelte:head>

<div class="font-mono min-h-screen flex flex-col">
	<header class="flex justify-between items-center py-6 px-12">
		<a class="text-4xl font-bold tracking-wide" href="/">Enceladus-1</a>
		{#if session}
			<a href="/dashboard" class="text-lg tracking-tighter border-2 border-black p-1">Dashboard</a>
		{:else}
			<a href="/login" class="text-lg tracking-tighter border-2 border-black p-1">Login or Signup</a
			>
		{/if}
	</header>

	<slot />
</div>
