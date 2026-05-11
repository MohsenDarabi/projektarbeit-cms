import bcrypt from 'bcrypt';
import { db } from '../db';
import { session, user } from '../db/schema';
import { eq } from 'drizzle-orm';

const SALT_ROUNDS = 10;
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30; // 30 Tage gültig

// Passwort hashen für die DB
export async function hashPassword(pw: string): Promise<string> {
	return bcrypt.hash(pw, SALT_ROUNDS);
}

// Checken ob das Passwort passt
export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
	return bcrypt.compare(pw, hash);
}

// Session für den User anlegen
export async function createSession(userId: string) {
	const sessionId = crypto.randomUUID();
	const exp = new Date(Date.now() + SESSION_DURATION);
	
	const sessObj = {
		id: sessionId,
		userId,
		expiresAt: exp
	};
	
	await db.insert(session).values(sessObj);
	
	return sessObj;
}

// Session prüfen und ggf. kicken wenn abgelaufen
export async function validateSession(sessionId: string) {
	const rows = await db.select().from(session).where(eq(session.id, sessionId)).limit(1);
	const sess = rows[0];
	
	if (!sess) return null;
	
	// Abgelaufen? Dann weg damit
	if (Date.now() >= sess.expiresAt.getTime()) {
		await db.delete(session).where(eq(session.id, sessionId));
		return null;
	}
	
	return sess;
}

// Logout / Session killen
export async function invalidateSession(id: string) {
	await db.delete(session).where(eq(session.id, id));
}

export async function getUserByUsername(name: string) {
	const rows = await db.select().from(user).where(eq(user.username, name)).limit(1);
	return rows[0] || null;
}

export async function getUserById(uid: string) {
	const rows = await db.select().from(user).where(eq(user.id, uid)).limit(1);
	return rows[0] || null;
}
