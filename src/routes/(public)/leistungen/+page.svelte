<script lang="ts">
	let { data } = $props();
</script>

<div class="py-16 sm:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Unsere Leistungen</h1>
			<p class="mt-6 text-lg leading-8 text-gray-600">
				Entdecken Sie unser breites Spektrum an professionellen Dienstleistungen, die individuell auf Ihre Bedürfnisse zugeschnitten sind.
			</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.services as service}
				<div class="flex flex-col overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg">
					{#if service.imagePath}
						<img src={service.imagePath} alt={service.title} class="h-48 w-full object-cover" />
					{:else}
						<div class="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400">
							Kein Bild
						</div>
					{/if}
					<div class="flex flex-1 flex-col p-6">
						<h3 class="text-xl font-bold text-gray-900">{service.title}</h3>
						<p class="mt-4 flex-1 text-base text-gray-600 line-clamp-3">
							{service.description}
						</p>
						<div class="mt-6">
							<a href="/leistungen/{service.slug}" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
								Mehr erfahren <span aria-hidden="true">&rarr;</span>
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
