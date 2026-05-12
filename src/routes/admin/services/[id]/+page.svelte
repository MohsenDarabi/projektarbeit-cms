<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	
	const isNew = data.service === null;
</script>

<div class="min-h-screen bg-gray-100 pb-12">
	<header class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">
				{isNew ? 'Neue Leistung' : 'Leistung bearbeiten'}
			</h1>
		</div>
	</header>

	<main class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="bg-white p-8 shadow sm:rounded-lg">
			<form method="POST" action="?/save" use:enhance enctype="multipart/form-data" class="space-y-6">
				{#if data.service?.imagePath}
					<div class="mb-4">
						<span class="block text-sm font-medium text-gray-700">Aktuelles Bild</span>
						<img src={data.service.imagePath} alt="Service" class="mt-2 h-32 w-auto rounded-md object-cover" />
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
				</div>

				<div>
					<label for="title" class="block text-sm font-medium text-gray-700">Titel</label>
					<input
						type="text"
						name="title"
						id="title"
						required
						value={data.service?.title ?? ''}
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					/>
				</div>

				<div>
					<label for="slug" class="block text-sm font-medium text-gray-700">Slug (URL-Pfad)</label>
					<input
						type="text"
						name="slug"
						id="slug"
						required
						value={data.service?.slug ?? ''}
						placeholder="z.b. web-design"
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					/>
				</div>

				<div>
					<label for="description" class="block text-sm font-medium text-gray-700">Beschreibung</label>
					<textarea
						id="description"
						name="description"
						rows="4"
						required
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					>{data.service?.description ?? ''}</textarea>
				</div>

				<div>
					<label for="order" class="block text-sm font-medium text-gray-700">Reihenfolge</label>
					<input
						type="number"
						name="order"
						id="order"
						value={data.service?.order ?? 0}
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					/>
				</div>

				{#if form?.message}
					<p class="text-sm font-medium text-red-600">{form.message}</p>
				{/if}

				<div class="flex justify-end space-x-3 pt-4">
					<a
						href="/admin/services"
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
