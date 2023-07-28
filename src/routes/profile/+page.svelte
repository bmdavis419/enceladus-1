<script lang="ts">
</script>

<div class="grow w-full flex flex-row items-center px-48 pb-32 bg-neutral-100">
	<form class="w-[400px] mx-4 p-4 bg-white drop-shadow-lg" method="POST" action="?/create">
		<h2 class="text-xl font-bold mb-2">Create Profile</h2>
		<div>
			<label id="first_name" for="first_name" class="block">first name</label>
			<input
				id="first_name"
				type="text"
				name="first_name"
				class="border-2 border-neutral-800 w-full px-4 py-2"
			/>
		</div>
		<div class="mt-2">
			<label id="last_name" for="last_name" class="block">last name</label>
			<input
				id="last_name"
				type="text"
				name="last_name"
				class="border-2 border-neutral-800 w-full px-4 py-2"
			/>
		</div>

		<div class="w-full flex justify-center mt-3">
			<button
				class="border-2 border-neutral-900 text-neutral-900 px-4 py-2 font-light hover:border-neutral-500"
				type="submit">Sign Up</button
			>
		</div>
	</form>
	<div class="grow flex justify-center">
		<h5 class="text-5xl font-extrabold">
			This is some <span
				class="block my-4 tracking-wider bg-gradient text-transparent bg-clip-text bg-gradient-to-tr from-orange-600 to-green-600"
				>INCREDIBLE</span
			> marketing copy.
		</h5>
	</div>
</div>
