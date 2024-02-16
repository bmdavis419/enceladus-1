<script>
	export let data;

	let { supabase } = data;
</script>

<div class="grow w-full flex justify-center items-center bg-neutral-100">
	<form class="bg-white rounded-md shadow-lg p-6" method="post">
		<h2 class="text-center">Welcome</h2>
		<button
			class="bg-black text-white w-full text-center py-4 px-4 mt-2 hover:shadow-lg"
			type="submit">Sign In With GitHub</button
		>
	</form>
	<button
		class="bg-black text-white w-full text-center py-4 px-4 mt-2 hover:shadow-lg"
		on:click={() =>
			supabase.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: 'http://localhost:5173/auth/callback'
				}
			})}>Sign In With GitHub CLIENT</button
	>
</div>
