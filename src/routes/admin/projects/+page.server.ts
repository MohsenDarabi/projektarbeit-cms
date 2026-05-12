import { getProjects, deleteProject } from '$lib/server/services/project-management';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	// Alle Referenzen für die Liste ziehen
	const rows = await getProjects();
	return {
		projects: rows
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const fd = await request.formData();
		const pid = fd.get('id') as string;
		
		if (!pid) return fail(400, { message: 'ID wird benötigt.' });
		
		await deleteProject(pid);
		return { success: true };
	}
};
