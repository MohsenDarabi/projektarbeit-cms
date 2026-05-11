import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

export function createTestDb() {
	const client = new Database(':memory:');
	const db = drizzle(client, { schema });
	
	// Push schema to memory db
	// In a real scenario, you'd use migrate or better yet, just mock the db
	// but for small projects, creating the tables manually or using a helper is fine.
	
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
	
	return db;
}
