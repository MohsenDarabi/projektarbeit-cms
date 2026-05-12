import { getServices, deleteService } from '$lib/server/services/service-management';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	// Alle verfügbaren Leistungen laden
	const list = await getServices();
	return {
		services: list
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const fd = await request.formData();
		const targetId = fd.get('id') as string;
		
		if (!targetId) return fail(400, { message: 'ID fehlt.' });
		
		await deleteService(targetId);
		return { success: true };
	}
};
