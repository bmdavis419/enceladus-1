<script>
	import homeBanner from '$lib/assets/home.jpeg';
</script>

<div class="w-full flex justify-between px-24 items-center grow">
	<div class="text-center flex flex-col gap-y-4">
		<h3 class="text-4xl font-semibold">
			Generate Images with <span
				class="bg-gradient text-transparent bg-clip-text bg-gradient-to-tr from-orange-600 to-green-600"
				>Ease</span
			>
		</h3>
		<h5 class="font-light">This is literally just a DALL-E wrapper...</h5>
		<div>
			<a
				href="/dashboard"
				class="mt-2 border border-black p-2 hover:border-green-300 lg:border-purple-400"
				>Get Started</a
			>
		</div>
	</div>
	<img alt="The Moon Enceladus" src={homeBanner} class="w-[500px] h-[500px]" />
</div>
