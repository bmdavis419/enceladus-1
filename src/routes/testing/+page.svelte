<script>
	export let data;

	const { session } = data;
</script>

{#if session}
	<div>
		<h2>You are logged in</h2>
		<h4>Welcome: {session.user.email}</h4>
	</div>
{:else}
	<div>
		<h2>You are not logged in :(</h2>
	</div>
{/if}
