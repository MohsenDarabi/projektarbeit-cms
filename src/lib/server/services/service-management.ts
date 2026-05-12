import { db } from '../db';
import { service } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function createService(payload: typeof service.$inferInsert) {
	const res = await db.insert(service).values(payload).returning();
	return res[0];
}

export async function getServices() {
	// order matters for frontend display
	return db.select().from(service).orderBy(service.order);
}

export async function getServiceBySlug(s: string) {
	const rows = await db.select().from(service).where(eq(service.slug, s)).limit(1);
	return rows[0] || null;
}

export async function updateService(id: string, update: Partial<typeof service.$inferInsert>) {
	const res = await db.update(service).set(update).where(eq(service.id, id)).returning();
	return res[0];
}

export async function deleteService(id: string) {
	await db.delete(service).where(eq(service.id, id));
}
