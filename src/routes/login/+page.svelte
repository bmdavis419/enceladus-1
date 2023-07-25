<script lang="ts">
	import { fade } from 'svelte/transition';
	let mode: 'signup' | 'login' = 'login';
</script>

<div class="grow w-full flex flex-row items-center px-12 pb-32 bg-neutral-100">
	{#if mode === 'login'}
		<form class="w-[400px] mx-4 p-4 bg-white drop-shadow-lg" in:fade method="POST" action="?/login">
			<h2 class="text-xl font-bold mb-2">Login</h2>
			<div>
				<label id="email" for="email" class="block">email</label>
				<input
					id="email"
					type="text"
					name="email"
					class="border-2 border-neutral-800 w-full px-4 py-2"
				/>
			</div>
			<div class="mt-2">
				<label id="password" for="password" class="block">password</label>
				<input
					id="password"
					name="password"
					type="password"
					class="border-2 border-neutral-800 w-full px-4 py-2"
				/>
			</div>
			<div class="w-full flex justify-center mt-3">
				<button
					class="border-2 border-neutral-900 text-neutral-900 px-4 py-2 font-light hover:border-neutral-500"
					type="submit">Login</button
				>
			</div>
			<div class="mt-4 flex justify-center w-full">
				<button
					class="text-neutral-600 font-extralight hover:underline"
					on:click={() => (mode = 'signup')}>signup</button
				>
			</div>
		</form>
	{:else}
		<form
			class="w-[400px] mx-4 p-4 bg-white drop-shadow-lg"
			in:fade
			method="POST"
			action="?/signup"
		>
			<h2 class="text-xl font-bold mb-2">Sign Up</h2>
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

			<div class="mt-2">
				<label id="email" for="email" class="block">email</label>
				<input
					id="email"
					type="text"
					name="email"
					class="border-2 border-neutral-800 w-full px-4 py-2"
				/>
			</div>
			<div class="mt-2">
				<label id="password" for="password" class="block">password</label>
				<input
					id="password"
					type="password"
					name="password"
					class="border-2 border-neutral-800 w-full px-4 py-2"
				/>
			</div>

			<!-- TODO: validate the passwords match -->
			<div class="mt-2">
				<label id="confirmPassword" for="confirmPassword" class="block">confirm password</label>
				<input
					id="confirmPassword"
					type="password"
					class="border-2 border-neutral-800 w-full px-4 py-2"
				/>
			</div>

			<div class="w-full flex justify-center mt-3">
				<button
					class="border-2 border-neutral-900 text-neutral-900 px-4 py-2 font-light hover:border-neutral-500"
					type="submit">Sign Up</button
				>
			</div>
			<div class="mt-4 flex justify-center w-full">
				<button
					class="text-neutral-600 font-extralight hover:underline"
					on:click={() => (mode = 'login')}>login</button
				>
			</div>
		</form>
	{/if}
	<div class="grow flex justify-center">
		<h5 class="text-5xl font-extrabold">
			This is some <span
				class="block my-4 tracking-wider bg-gradient text-transparent bg-clip-text bg-gradient-to-tr from-orange-600 to-green-600"
				>INCREDIBLE</span
			> marketing copy.
		</h5>
	</div>
</div>
