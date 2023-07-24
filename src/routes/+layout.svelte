<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Enceladus-1: the DALL-E wrapper</title>
	<meta name="description" content="It's on Enceladus" />
</svelte:head>

<div class="font-mono min-h-screen flex flex-col">
	<header class="flex justify-between items-center py-6 px-12">
		<h2 class="text-4xl font-bold tracking-wide">Enceladus-1</h2>
		<a href="/login" class="text-lg tracking-tighter border-2 border-black p-1">Login or Signup</a>
	</header>

	<slot />
</div>
