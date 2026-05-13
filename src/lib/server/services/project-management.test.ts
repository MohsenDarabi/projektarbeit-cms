import { describe, it, expect, vi } from 'vitest';
import { createProject, getProjects, updateProject, deleteProject } from './project-management';

const { testDb } = vi.hoisted(() => {
	const { drizzle } = require('drizzle-orm/better-sqlite3');
	const Database = require('better-sqlite3');
	const client = new Database(':memory:');
	const db = drizzle(client);
	
	client.exec(`
		CREATE TABLE project (
			id TEXT PRIMARY KEY,
			title TEXT NOT NULL,
			client TEXT NOT NULL,
			description TEXT NOT NULL,
			image_path TEXT,
			date TEXT,
			tags TEXT
		);
	`);
	
	return { testDb: db };
});

vi.mock('../db', () => ({
	db: testDb
}));

describe('ProjectManagement', () => {
	const mockProject = {
		title: 'Modern Villa',
		client: 'John Doe',
		description: 'A beautiful modern villa design',
		tags: 'Architecture, Interior'
	};

	it('should create a new project', async () => {
		const created = await createProject(mockProject);
		expect(created.id).toBeDefined();
		expect(created.title).toBe(mockProject.title);
	});

	it('should retrieve all projects', async () => {
		const projects = await getProjects();
		expect(projects.length).toBeGreaterThan(0);
		expect(projects[0].title).toBe(mockProject.title);
	});

	it('should update a project', async () => {
		const projects = await getProjects();
		const id = projects[0].id;
		const updated = await updateProject(id, { title: 'Luxury Villa' });
		
		expect(updated.title).toBe('Luxury Villa');
	});

	it('should delete a project', async () => {
		const projects = await getProjects();
		const id = projects[0].id;
		await deleteProject(id);
		
		const allProjects = await getProjects();
		expect(allProjects.length).toBe(0);
	});
});
