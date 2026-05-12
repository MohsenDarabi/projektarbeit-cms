import { redirect, type Handle } from '@sveltejs/kit';
import { validateSession, getUserById } from '$lib/server/auth/auth.service';

export const handle: Handle = async ({ event, resolve }) => {
	const sid = event.cookies.get('session');
	
	// Helper um Admins auf den Login zu werfen
	const kickToLogin = () => {
		if (event.url.pathname.startsWith('/admin')) {
			throw redirect(303, '/login');
		}
	};

	if (!sid) {
		kickToLogin();
		return resolve(event);
	}

	const sess = await validateSession(sid);
	if (!sess) {
		event.cookies.delete('session', { path: '/' });
		kickToLogin();
		return resolve(event);
	}

	const u = await getUserById(sess.userId);
	if (!u) {
		event.cookies.delete('session', { path: '/' });
		kickToLogin();
		return resolve(event);
	}

	// User-Daten für die Locals setzen
	event.locals.user = {
		id: u.id,
		username: u.username
	};

	return resolve(event);
};
