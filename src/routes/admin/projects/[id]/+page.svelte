<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	
	// Checken ob wir ein neues Projekt anlegen oder editieren
	let newMode = $derived(data.project === null);

	// console.log('DEBUG: form state', form);
</script>

<div class="min-h-screen bg-gray-100 pb-12">
	<header class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">
				{newMode ? 'Neues Projekt anlegen' : 'Projekt bearbeiten'}
			</h1>
		</div>
	</header>

	<main class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="bg-white p-8 shadow sm:rounded-lg">
			<form method="POST" action="?/save" use:enhance enctype="multipart/form-data" class="space-y-6">
				{#if data.project?.imagePath}
					<div class="mb-4">
						<span class="block text-sm font-medium text-gray-700">Aktuelles Vorschaubild</span>
						<img src={data.project.imagePath} alt="Projekt" class="mt-2 h-32 w-auto rounded-md object-cover" />
					</div>
				{/if}

				<div>
					<label for="image" class="block text-sm font-medium text-gray-700">Bild hochladen</label>
					<input
						type="file"
						name="image"
						id="image"
						accept="image/*"
						class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
					/>
					<!-- TODO: Vielleicht später mal Drag & Drop support? -->
				</div>

				<div>
					<label for="title" class="block text-sm font-medium text-gray-700">Titel des Projekts</label>
					<input
						type="text"
						name="title"
						id="title"
						required
						value={data.project?.title ?? ''}
						class="my-input mt-1 block w-full"
					/>
				</div>

				<div>
					<label for="client" class="block text-sm font-medium text-gray-700">Kunde</label>
					<input
						type="text"
						name="client"
						id="client"
						required
						value={data.project?.client ?? ''}
						class="my-input mt-1 block w-full"
					/>
				</div>

				<div>
					<label for="date" class="block text-sm font-medium text-gray-700">Datum / Zeitraum</label>
					<input
						type="text"
						name="date"
						id="date"
						placeholder="z.B. Sommer 2023"
						value={data.project?.date ?? ''}
						class="my-input mt-1 block w-full"
					/>
				</div>

				<div>
					<label for="tags" class="block text-sm font-medium text-gray-700">Tags (kommagetrennt)</label>
					<input
						type="text"
						name="tags"
						id="tags"
						placeholder="Web, Design, SEO"
						value={data.project?.tags ?? ''}
						class="my-input mt-1 block w-full"
					/>
				</div>

				<div>
					<label for="description" class="block text-sm font-medium text-gray-700">Beschreibung</label>
					<textarea
						id="description"
						name="description"
						rows="6"
						required
						class="my-input mt-1 block w-full"
					>{data.project?.description ?? ''}</textarea>
				</div>

				{#if form?.message}
					<p class="text-sm font-medium text-red-600">{form.message}</p>
				{/if}

				<div class="flex justify-end space-x-3 pt-4">
					<a
						href="/admin/projects"
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Abbrechen
					</a>
					<button
						type="submit"
						class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Speichern
					</button>
				</div>
			</form>
		</div>
	</main>
</div>

<style>
	.my-input {
		border-radius: 4px;
		border: 1px solid #ccc;
		padding: 8px 10px;
		font-size: 14px;
	}
	.my-input:focus {
		border-color: #6366f1;
		outline: none;
	}
</style>
