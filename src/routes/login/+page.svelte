<script>
	export let data;

	let { supabase } = data;

	async function signInWithGitHub() {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: '/profile'
			}
		});
	}
</script>

<div class="grow w-full flex justify-center items-center bg-neutral-100">
	<div class="bg-white rounded-md shadow-lg p-6">
		<h2 class="text-center">Welcome</h2>
		<button class="" on:click={signInWithGitHub}>Sign In With GitHub</button>
	</div>
</div>
