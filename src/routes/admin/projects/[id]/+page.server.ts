import { createProject, updateProject, getProjectById } from '$lib/server/services/project-management';
import { validateImage, processImage } from '$lib/server/services/image-service';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	if (params.id === 'new') {
		return { project: null };
	}

	const item = await getProjectById(params.id);

	if (!item) {
		throw redirect(303, '/admin/projects');
	}

	return {
		project: item
	};
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		const client = data.get('client') as string;
		const description = data.get('description') as string;
		const date = data.get('date') as string;
		const tags = data.get('tags') as string;
		const imageFile = data.get('image') as File;

		if (!title || !client || !description) {
			return fail(400, { message: 'Title, Client and Description are required' });
		}

		let imagePath: string | undefined = undefined;
		if (imageFile && imageFile.size > 0) {
			if (!validateImage(imageFile)) {
				return fail(400, { message: 'Invalid image file (max 5MB, JPG/PNG/WebP)' });
			}
			imagePath = await processImage(imageFile);
		}

		const projectData: any = { title, client, description, date, tags };
		if (imagePath) projectData.imagePath = imagePath;

		try {
			if (params.id === 'new') {
				await createProject(projectData);
			} else {
				await updateProject(params.id, projectData);
			}
		} catch (error: any) {
			return fail(500, { message: 'Database error' });
		}

		throw redirect(303, '/admin/projects');
	}
};
