<script lang="ts">
	export let data;
</script>

<div class="grow w-full flex justify-center items-center bg-neutral-100">
	<div>
		{#each data.imageUrls as image}
			<div>
				<img src={image.value} alt="NAME" />
				<h2>{image.query}</h2>
				<h5>{image.createdAt.toDateString()}</h5>
			</div>
		{/each}
	</div>
</div>
