<script lang="ts">
	let { data } = $props();
</script>

<div class="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
	<!-- Background Image with Overlay -->
	<div class="absolute inset-0 z-0">
		<img 
			src="/img1.jpg" 
			alt="Hansa Homerenovierung Background" 
			class="h-full w-full object-cover opacity-60"
		/>
		<div class="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-gray-900/60"></div>
	</div>

	<div class="relative z-10 mx-auto max-w-2xl px-6 py-32 sm:py-48 lg:py-56 text-center">
		<h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">
			Wir machen aus Ihrem Haus ein Zuhause.
		</h1>
		<p class="mt-6 text-lg leading-8 text-gray-100 drop-shadow-md">
			Qualitätshandwerk aus einer Hand. Von der Sanierung bis zum Innenausbau – Hansa Homerenovierung bringt frischen Wind in Ihre vier Wände.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a href="/leistungen" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">
				Unsere Leistungen
			</a>
			<a href="/projekte" class="text-sm font-semibold leading-6 text-white hover:text-gray-200 transition-colors drop-shadow-md">
				Referenzen ansehen <span aria-hidden="true">→</span>
			</a>
		</div>
	</div>
</div>

<div class="bg-gray-50 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Warum wir?</h2>
			<p class="mt-6 text-lg leading-8 text-gray-600">
				Langjährige Erfahrung und ein Auge fürs Detail machen uns zum idealen Partner für Ihr nächstes Projekt.
			</p>
		</div>
	</div>
</div>
