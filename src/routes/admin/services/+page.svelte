<script lang="ts">
	import { enhance } from '$app/forms';
	let { data } = $props();
</script>

<div class="min-h-screen bg-gray-100 pb-12">
	<header class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">Leistungen</h1>
			<a href="/admin/services/new" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
				Neue Leistung
			</a>
		</div>
	</header>

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="bg-white shadow sm:rounded-md overflow-hidden">
			<ul role="list" class="divide-y divide-gray-200">
				{#each data.services as service}
					<li class="px-6 py-4 flex items-center justify-between">
						<div class="flex-1 min-w-0">
							<h3 class="text-lg font-medium text-gray-900 truncate">{service.title}</h3>
							<p class="text-sm text-gray-500">{service.slug}</p>
						</div>
						<div class="flex space-x-4">
							<a href="/admin/services/{service.id}" class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Bearbeiten</a>
							<form method="POST" action="?/delete" use:enhance>
								<input type="hidden" name="id" value={service.id} />
								<button type="submit" class="text-red-600 hover:text-red-900 text-sm font-medium">Löschen</button>
							</form>
						</div>
					</li>
				{:else}
					<li class="px-6 py-12 text-center text-gray-500">
						Keine Leistungen gefunden. Legen Sie Ihre erste Leistung an!
					</li>
				{/each}
			</ul>
		</div>
		<div class="mt-8">
			<a href="/admin" class="text-indigo-600 hover:text-indigo-500">&larr; Zurück zum Dashboard</a>
		</div>
	</main>
</div>
