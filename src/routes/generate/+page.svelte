<script>
	import { enhance } from '$app/forms';

	let isLoading = false;
</script>

<div class="grow w-full flex items-center justify-center bg-neutral-50">
	<form
		class="bg-neutral-100 shadow-md p-8"
		method="POST"
		action="?/new"
		use:enhance={() => {
			isLoading = true;
		}}
	>
		<label for="prompt" class="block font-extralight tracking-wide">Enter Your Prompt Here:</label>
		<textarea name="prompt" class="w-[500px] h-[200px] px-2 py-1" />
		<div class="w-full flex justify-center mt-4">
			{#if !isLoading}
				<button class="bg-neutral-800 px-4 py-2 font-bold text-white hover:shadow-xl" type="submit"
					>Generate</button
				>
			{:else}
				<button
					class="bg-neutral-400 px-4 py-2 font-bold text-white hover:shadow-xl"
					disabled={true}>Loading...</button
				>
			{/if}
		</div>
	</form>
</div>
