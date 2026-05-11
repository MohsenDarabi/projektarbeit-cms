import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// User Tabelle für den Login
export const user = sqliteTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

// Leistungen / Services
export const service = sqliteTable('service', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	description: text('description').notNull(),
	slug: text('slug').notNull().unique(),
	imagePath: text('image_path'),
	order: integer('order').default(0) // Für die Sortierung im Frontend
});

// Referenzprojekte
export const project = sqliteTable('project', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	client: text('client').notNull(),
	description: text('description').notNull(),
	imagePath: text('image_path'),
	date: text('date'), // z.B. "2023"
	tags: text('tags') // Kommagetrennte Liste
});

// Sessions für die Auth
export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});
