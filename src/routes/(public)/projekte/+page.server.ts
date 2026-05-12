import { getProjects } from '$lib/server/services/project-management';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await getProjects();
	return {
		projects
	};
};
