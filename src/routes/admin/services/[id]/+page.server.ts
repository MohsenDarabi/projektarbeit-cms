import { createService, updateService } from '$lib/server/services/service-management';
import { validateImage, processImage } from '$lib/server/services/image-service';
import { eq } from 'drizzle-orm';
import { service } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	// Neuen Service anlegen?
	if (params.id === 'new') {
		return { service: null };
	}

	const rows = await db.select().from(service).where(eq(service.id, params.id)).limit(1);
	const entry = rows[0];

	if (!entry) {
		throw redirect(303, '/admin/services');
	}

	return {
		service: entry
	};
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const fd = await request.formData();
		const title = fd.get('title') as string;
		const description = fd.get('description') as string;
		const slug = fd.get('slug') as string;
		const order = parseInt(fd.get('order') as string) || 0;
		const img = fd.get('image') as File;

		// Validation
		if (!title || !description || !slug) {
			return fail(400, { message: 'Bitte alle Pflichtfelder ausfüllen.' });
		}

		let imagePath: string | undefined = undefined;
		if (img && img.size > 0) {
			if (!validateImage(img)) {
				return fail(400, { message: 'Das Bild ist nicht gültig oder zu groß.' });
			}
			imagePath = await processImage(img);
		}

		// Daten-Objekt für DB bauen
		const payload: any = { title, description, slug, order };
		if (imagePath) payload.imagePath = imagePath;

		try {
			if (params.id === 'new') {
				await createService(payload);
			} else {
				await updateService(params.id, payload);
			}
		} catch (err: any) {
			// Slug muss eindeutig sein
			if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
				return fail(400, { message: 'Dieser Slug wird bereits verwendet.' });
			}
			console.error('Service Save Error:', err);
			return fail(500, { message: 'Da ist beim Speichern was schiefgelaufen.' });
		}

		throw redirect(303, '/admin/services');
	}
};
