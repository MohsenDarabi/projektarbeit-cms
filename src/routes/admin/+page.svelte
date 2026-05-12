<script lang="ts">
	let { data } = $props();
	
	// Menu State für die Mobile-Ansicht
	let showMobile = $state(false);

	function doToggle() {
		showMobile = !showMobile;
	}
</script>

<div class="min-h-screen bg-gray-100">
	<nav class="bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between">
				<div class="flex">
					<div class="flex flex-shrink-0 items-center font-bold text-indigo-600">
						Unternehmens-CMS
					</div>
					<!-- Desktop Links -->
					<div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
						<a href="/admin" class="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900">
							Dashboard
						</a>
						<a href="/admin/services" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
							Leistungen
						</a>
						<a href="/admin/projects" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
							Referenzen
						</a>
					</div>
				</div>
				<!-- Desktop Right -->
				<div class="hidden sm:flex sm:items-center">
					<span class="mr-4 text-sm text-gray-500">Hallo, {data.user?.username}</span>
					<form method="POST" action="/login?/logout">
						<button type="submit" class="text-sm font-medium text-red-600 hover:text-red-500">
							Abmelden
						</button>
					</form>
				</div>
				<!-- Mobile Menu Button -->
				<div class="flex items-center sm:hidden">
					<button type="button" onclick={doToggle} class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
						<span class="sr-only">Menü öffnen</span>
						{#if !showMobile}
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							</svg>
						{:else}
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Menu Overlay -->
		{#if showMobile}
			<div class="sm:hidden border-t border-gray-200">
				<div class="space-y-1 pb-3 pt-2">
					<a href="/admin" class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700">Dashboard</a>
					<a href="/admin/services" class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">Leistungen</a>
					<a href="/admin/projects" class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">Referenzen</a>
				</div>
				<div class="border-t border-gray-200 pb-3 pt-4">
					<div class="px-4">
						<div class="text-base font-medium text-gray-800">{data.user?.username}</div>
					</div>
					<div class="mt-3 space-y-1">
						<form method="POST" action="/login?/logout">
							<button type="submit" class="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-100">Abmelden</button>
						</form>
					</div>
				</div>
			</div>
		{/if}
	</nav>

	<header class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
		</div>
	</header>

	<main>
		<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			<div class="px-4 py-6 sm:px-0">
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<div class="overflow-hidden rounded-lg bg-white shadow">
						<div class="p-5">
							<h3 class="text-lg font-medium text-gray-900">Leistungen</h3>
							<p class="mt-1 text-sm text-gray-500">Verwalten Sie Ihre angebotenen Dienstleistungen.</p>
							<div class="mt-4">
								<a href="/admin/services" class="text-indigo-600 hover:text-indigo-500">Ansehen &rarr;</a>
							</div>
						</div>
					</div>
					<div class="overflow-hidden rounded-lg bg-white shadow">
						<div class="p-5">
							<h3 class="text-lg font-medium text-gray-900">Referenzen</h3>
							<p class="mt-1 text-sm text-gray-500">Präsentieren Sie Ihre erfolgreich abgeschlossenen Projekte.</p>
							<div class="mt-4">
								<a href="/admin/projects" class="text-indigo-600 hover:text-indigo-500">Ansehen &rarr;</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
