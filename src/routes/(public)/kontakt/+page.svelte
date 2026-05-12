<script lang="ts">
	import { enhance } from '$app/forms';
	// Das Formular für User-Anfragen
	let { form: contactForm } = $props();
</script>

<div class="py-16 sm:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Kontakt aufnehmen</h1>
			<p class="mt-4 text-lg leading-8 text-gray-600">
				Haben Sie Fragen oder ein Projekt? Wir freuen uns auf Ihre Nachricht.
			</p>
		</div>

		<div class="mx-auto mt-16 max-w-xl">
			{#if contactForm?.success}
				<div class="rounded-md bg-green-50 p-4 mb-8">
					<div class="flex">
						<div class="ml-3">
							<h3 class="text-sm font-medium text-green-800">Nachricht verschickt!</h3>
							<p class="mt-2 text-sm text-green-700">Wir melden uns zeitnah bei Ihnen.</p>
						</div>
					</div>
				</div>
			{/if}

			<form method="POST" use:enhance class="grid grid-cols-1 gap-y-6">
				<div>
					<label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Ihr Name</label>
					<div class="mt-2.5">
						<input
							type="text"
							name="name"
							id="name"
							value={contactForm?.data?.name ?? ''}
							class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						{#if contactForm?.errors?.name}
							<p class="mt-2 text-sm text-red-600">{contactForm.errors.name}</p>
						{/if}
					</div>
				</div>

				<div>
					<label for="email" class="block text-sm font-semibold leading-6 text-gray-900">E-Mail</label>
					<div class="mt-2.5">
						<input
							type="email"
							name="email"
							id="email"
							value={form?.data?.email ?? ''}
							class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						{#if form?.errors?.email}
							<p class="mt-2 text-sm text-red-600">{form.errors.email}</p>
						{/if}
					</div>
				</div>

				<div>
					<label for="subject" class="block text-sm font-semibold leading-6 text-gray-900">Betreff</label>
					<div class="mt-2.5">
						<input
							type="text"
							name="subject"
							id="subject"
							value={form?.data?.subject ?? ''}
							class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						{#if form?.errors?.subject}
							<p class="mt-2 text-sm text-red-600">{form.errors.subject}</p>
						{/if}
					</div>
				</div>

				<div>
					<label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Nachricht</label>
					<div class="mt-2.5">
						<textarea
							name="message"
							id="message"
							rows="4"
							class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						>{form?.data?.message ?? ''}</textarea>
						{#if form?.errors?.message}
							<p class="mt-2 text-sm text-red-600">{form.errors.message}</p>
						{/if}
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Nachricht senden
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
