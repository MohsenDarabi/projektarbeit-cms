<script lang="ts">
	import "../../app.css";
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">CMS Login</h2>
			<p class="mt-2 text-center text-sm text-gray-600">Bitte melden Sie sich an, um Inhalte zu verwalten</p>
		</div>
		<form class="mt-8 space-y-6" method="POST" action="?/login" use:enhance>
			<div class="-space-y-px rounded-md shadow-sm">
				<div>
					<label for="username" class="sr-only">Benutzername</label>
					<input
						id="username"
						name="username"
						type="text"
						required
						class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Benutzername"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Passwort</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Passwort"
					/>
				</div>
			</div>

			{#if form?.message}
				<div class="rounded-md bg-red-50 p-4">
					<div class="flex">
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-800">{form.message}</h3>
						</div>
					</div>
				</div>
			{/if}

			<div>
				<button
					type="submit"
					class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Anmelden
				</button>
			</div>
		</form>
	</div>
</div>
