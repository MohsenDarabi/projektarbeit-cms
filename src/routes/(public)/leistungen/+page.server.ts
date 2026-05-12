import { getServices } from '$lib/server/services/service-management';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const services = await getServices();
	return {
		services
	};
};
