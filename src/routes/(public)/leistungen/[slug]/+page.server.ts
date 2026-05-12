import { getServiceBySlug } from '$lib/server/services/service-management';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const service = await getServiceBySlug(params.slug);
	
	if (!service) {
		throw error(404, 'Leistung nicht gefunden');
	}
	
	return {
		service
	};
};
