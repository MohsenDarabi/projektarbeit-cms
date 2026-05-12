<script lang="ts">
	let { data } = $props();
</script>

<div class="py-16 sm:py-24 bg-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Unsere Referenzen</h1>
			<p class="mt-4 text-lg leading-8 text-gray-600">
				Ein Einblick in unsere erfolgreich abgeschlossenen Projekte und die Zusammenarbeit mit unseren Kunden.
			</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-12">
			{#each data.projects as project}
				<div class="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-50 transition hover:bg-gray-100">
					<div class="aspect-h-9 aspect-w-16 sm:aspect-h-1 overflow-hidden bg-gray-200">
						{#if project.imagePath}
							<img
								src={project.imagePath}
								alt={project.title}
								class="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
							/>
						{:else}
							<div class="flex h-full w-full items-center justify-center text-gray-400 italic">
								Kein Projektbild verfügbar
							</div>
						{/if}
					</div>
					<div class="flex flex-1 flex-col p-8">
						<div class="flex items-center gap-x-2 text-xs text-indigo-600 font-semibold uppercase tracking-wider">
							<span>{project.client}</span>
							{#if project.date}
								<span class="text-gray-300">•</span>
								<span class="text-gray-500 font-normal">{project.date}</span>
							{/if}
						</div>
						<h3 class="mt-4 text-2xl font-bold text-gray-900">{project.title}</h3>
						<p class="mt-4 text-base leading-7 text-gray-600 whitespace-pre-wrap">
							{project.description}
						</p>
						
						{#if project.tags}
							<div class="mt-6 flex flex-wrap gap-2">
								{#each project.tags.split(',') as tag}
									<span class="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
										{tag.trim()}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<div class="col-span-full py-24 text-center">
					<p class="text-lg text-gray-500 italic">Noch keine Referenzprojekte veröffentlicht.</p>
				</div>
			{/each}
		</div>
	</div>
</div>
