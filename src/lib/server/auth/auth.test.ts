import { describe, it, expect, vi } from 'vitest';
import { hashPassword, verifyPassword, createSession, validateSession, invalidateSession } from './auth.service';

const { testDb } = vi.hoisted(() => {
	const { drizzle } = require('drizzle-orm/better-sqlite3');
	const Database = require('better-sqlite3');
	const client = new Database(':memory:');
	const db = drizzle(client);
	
	// In-Memory DB für Tests aufsetzen
	client.exec(`
		CREATE TABLE user (
			id TEXT PRIMARY KEY,
			username TEXT NOT NULL UNIQUE,
			password_hash TEXT NOT NULL
		);
		CREATE TABLE session (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL REFERENCES user(id),
			expires_at INTEGER NOT NULL
		);
	`);
	
	return { testDb: db };
});

// DB-Modul mocken, damit wir die In-Memory DB nutzen
vi.mock('../db', () => ({
	db: testDb
}));

describe('Auth Service Tests', () => {
	it('PW hashen und checken', async () => {
		const pw = 'super-geheim-123';
		const hash = await hashPassword(pw);
		
		expect(hash).toBeDefined();
		expect(hash).not.toBe(pw);
		
		const ok = await verifyPassword(pw, hash);
		expect(ok).toBe(true);
		
		const falsch = await verifyPassword('falsches-pw', hash);
		expect(falsch).toBe(false);
	});

	it('Sessions anlegen, prüfen und killen', async () => {
		const uid = 'test-user-id';
		
		// User dummy in die DB werfen
		await testDb.run(require('drizzle-orm').sql`INSERT INTO user (id, username, password_hash) VALUES (${uid}, 'tester', 'hash')`);

		const s = await createSession(uid);
		
		expect(s.id).toBeDefined();
		expect(s.userId).toBe(uid);
		
		const check = await validateSession(s.id);
		expect(check).not.toBeNull();
		expect(check?.userId).toBe(uid);
		
		// Logout simulieren
		await invalidateSession(s.id);
		const check2 = await validateSession(s.id);
		expect(check2).toBeNull();
	});
});
