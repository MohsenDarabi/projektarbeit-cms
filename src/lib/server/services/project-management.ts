import { db } from '../db';
import { project } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function createProject(payload: typeof project.$inferInsert) {
	const res = await db.insert(project).values(payload).returning();
	return res[0];
}

export async function getProjects() {
	return db.select().from(project);
}

export async function getProjectById(id: string) {
	const res = await db.select().from(project).where(eq(project.id, id)).limit(1);
	return res[0] || null;
}

export async function updateProject(id: string, updateData: Partial<typeof project.$inferInsert>) {
	const res = await db.update(project).set(updateData).where(eq(project.id, id)).returning();
	return res[0];
}

export async function deleteProject(id: string) {
	// TODO: Soft delete?
	await db.delete(project).where(eq(project.id, id));
}
