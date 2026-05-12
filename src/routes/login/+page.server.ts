import { fail, redirect } from '@sveltejs/kit';
import { getUserByUsername, verifyPassword, createSession, invalidateSession } from '$lib/server/auth/auth.service';
import type { Actions } from './$types';

export const actions = {
	login: async ({ request, cookies }) => {
		const fd = await request.formData();
		const userVal = fd.get('username') as string;
		const passVal = fd.get('password') as string;

		// Check ob alles da ist
		if (!userVal || !passVal) {
			return fail(400, { message: 'Bitte Benutzername und Passwort eingeben.' });
		}

		const u = await getUserByUsername(userVal);
		if (!u) {
			// Aus Sicherheitsgründen die gleiche Meldung wie bei falschem PW
			return fail(401, { message: 'Zugangsdaten sind nicht korrekt.' });
		}

		const isOk = await verifyPassword(passVal, u.passwordHash);
		if (!isOk) {
			return fail(401, { message: 'Zugangsdaten sind nicht korrekt.' });
		}

		// Alles klar, Session bauen
		const sess = await createSession(u.id);
		
		cookies.set('session', sess.id, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			expires: sess.expiresAt
		});

		// Ab ins Dashboard
		throw redirect(303, '/admin');
	},
	logout: async ({ cookies }) => {
		const sid = cookies.get('session');
		if (sid) {
			await invalidateSession(sid);
			cookies.delete('session', { path: '/' });
		}
		throw redirect(303, '/login');
	}
} satisfies Actions;
