<script lang="ts">
	import "../../app.css";
	let { children } = $props();
	let isMobileMenuOpen = $state(false);

	function toggleMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<div class="flex min-h-screen flex-col bg-white text-gray-900">
	<nav class="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between items-center">
				<div class="flex items-center">
					<a href="/" class="text-xl font-bold text-indigo-600">Hansa Homerenovierung</a>
				</div>
				<!-- Desktop Menu -->
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-8">
						<a href="/" class="hover:text-indigo-600 px-3 py-2 text-sm font-medium">Start</a>
						<a href="/leistungen" class="hover:text-indigo-600 px-3 py-2 text-sm font-medium">Leistungen</a>
						<a href="/projekte" class="hover:text-indigo-600 px-3 py-2 text-sm font-medium">Referenzen</a>
						<a href="/kontakt" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Kontakt</a>
					</div>
				</div>
				<!-- Mobile Menu Button -->
				<div class="flex md:hidden">
					<button type="button" onclick={toggleMenu} class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
						<span class="sr-only">Menü öffnen</span>
						{#if !isMobileMenuOpen}
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							</svg>
						{:else}
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Menu Overlay -->
		{#if isMobileMenuOpen}
			<div class="md:hidden border-t border-gray-200 bg-white">
				<div class="space-y-1 px-2 pb-3 pt-2">
					<a href="/" onclick={toggleMenu} class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600">Start</a>
					<a href="/leistungen" onclick={toggleMenu} class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600">Leistungen</a>
					<a href="/projekte" onclick={toggleMenu} class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600">Referenzen</a>
					<a href="/kontakt" onclick={toggleMenu} class="block rounded-md bg-indigo-600 px-3 py-2 text-base font-medium text-white hover:bg-indigo-700 text-center mt-4">Kontakt</a>
				</div>
			</div>
		{/if}
	</nav>

	<main class="flex-grow">
		{@render children()}
	</main>

	<footer class="border-t bg-gray-50 py-12">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
			<p class="text-sm text-gray-500">
				&copy; {new Date().getFullYear()} Hansa Homerenovierung. Alle Rechte vorbehalten.
			</p>
			<div class="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
				<a href="/impressum" class="hover:text-gray-900">Impressum</a>
				<a href="/datenschutz" class="hover:text-gray-900">Datenschutz</a>
				<a href="/login" class="hover:text-gray-900 border-l pl-6">Admin</a>
			</div>
		</div>
	</footer>
</div>
