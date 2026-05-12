<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.service.title} - UnternehmensName</title>
	<meta name="description" content={data.service.description.substring(0, 160)} />
</svelte:head>

<article class="py-16 sm:py-24">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<a href="/leistungen" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
			&larr; Zurück zur Übersicht
		</a>
		
		<header class="mt-8">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{data.service.title}</h1>
		</header>

		{#if data.service.imagePath}
			<div class="mt-10 overflow-hidden rounded-3xl bg-gray-100 shadow-xl">
				<img src={data.service.imagePath} alt={data.service.title} class="w-full object-cover" />
			</div>
		{/if}

		<div class="mt-12 prose prose-indigo prose-lg text-gray-600">
			<p class="whitespace-pre-wrap leading-relaxed">
				{data.service.description}
			</p>
		</div>

		<div class="mt-16 border-t pt-12 text-center">
			<h2 class="text-2xl font-bold text-gray-900">Haben Sie Fragen zu dieser Leistung?</h2>
			<p class="mt-4 text-gray-600">Wir beraten Sie gerne individuell und unverbindlich.</p>
			<div class="mt-8">
				<a href="/kontakt" class="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-700">
					Jetzt Kontakt aufnehmen
				</a>
			</div>
		</div>
	</div>
</article>
