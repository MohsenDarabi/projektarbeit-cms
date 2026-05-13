import { describe, it, expect, vi } from 'vitest';
import { createService, getServices, getServiceBySlug, updateService, deleteService } from './service-management';

const { testDb } = vi.hoisted(() => {
	const { drizzle } = require('drizzle-orm/better-sqlite3');
	const Database = require('better-sqlite3');
	const client = new Database(':memory:');
	const db = drizzle(client);
	
	client.exec(`
		CREATE TABLE service (
			id TEXT PRIMARY KEY,
			title TEXT NOT NULL,
			description TEXT NOT NULL,
			slug TEXT NOT NULL UNIQUE,
			image_path TEXT,
			"order" INTEGER DEFAULT 0
		);
	`);
	
	return { testDb: db };
});

vi.mock('../db', () => ({
	db: testDb
}));

describe('ServiceManagement', () => {
	const mockService = {
		title: 'Web Design',
		description: 'Creating beautiful websites',
		slug: 'web-design',
		order: 1
	};

	it('should create a new service', async () => {
		const created = await createService(mockService);
		expect(created.id).toBeDefined();
		expect(created.title).toBe(mockService.title);
	});

	it('should retrieve all services', async () => {
		const services = await getServices();
		expect(services.length).toBeGreaterThan(0);
		expect(services[0].title).toBe(mockService.title);
	});

	it('should retrieve a service by slug', async () => {
		const service = await getServiceBySlug('web-design');
		expect(service).not.toBeNull();
		expect(service?.title).toBe(mockService.title);
	});

	it('should update a service', async () => {
		const services = await getServices();
		const id = services[0].id;
		const updated = await updateService(id, { title: 'Advanced Web Design' });
		
		expect(updated.title).toBe('Advanced Web Design');
		
		const fetched = await getServiceBySlug('web-design');
		expect(fetched?.title).toBe('Advanced Web Design');
	});

	it('should delete a service', async () => {
		const services = await getServices();
		const id = services[0].id;
		await deleteService(id);
		
		const fetched = await getServiceBySlug('web-design');
		expect(fetched).toBeNull();
	});
});
