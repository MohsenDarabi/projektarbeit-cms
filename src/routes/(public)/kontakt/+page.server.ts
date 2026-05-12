import { fail } from '@sveltejs/kit';
import { checkKontaktForm, type KontaktData } from '$lib/utils/validation';
import { sendEmail } from '$lib/server/services/email-service';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const fd = await request.formData();
		
		// Daten aus dem Formular ziehen
		const payload: KontaktData = {
			name: fd.get('name') as string,
			email: fd.get('email') as string,
			subject: fd.get('subject') as string,
			message: fd.get('message') as string
		};

		// Einmal validieren bitte
		const errs = checkKontaktForm(payload);

		if (Object.keys(errs).length > 0) {
			return fail(400, { errors: errs, data: payload });
		}

		try {
			await sendEmail(payload);
		} catch (e) {
			// Falls der Mail-Versand abschmiert
			console.error('Mail-Versand Fehler:', e);
			return fail(500, { message: 'Konnte die Mail nicht senden, sorry!', data: payload });
		}

		return { success: true };
	}
};
