import { describe, it, expect, vi, beforeEach } from 'vitest';
import { actions } from './+page.server';
import * as authService from '$lib/server/auth/auth.service';
import { fail, redirect } from '@sveltejs/kit';

vi.mock('$lib/server/auth/auth.service');
vi.mock('@sveltejs/kit', async () => {
	const actual = await vi.importActual('@sveltejs/kit');
	return {
		...actual,
		fail: vi.fn((status, data) => ({ status, data })),
		redirect: vi.fn((status, location) => {
			throw { status, location };
		})
	};
});

describe('Login Actions', () => {
	it('should return 400 if username or password is missing', async () => {
		const formData = new FormData();
		const event = {
			request: {
				formData: async () => formData
			}
		} as any;

		const result = await actions.login(event);
		expect(result.status).toBe(400);
		expect(result.data.message).toBe('Username and password are required');
	});

	it('should redirect to /admin on successful login', async () => {
		const formData = new FormData();
		formData.append('username', 'admin');
		formData.append('password', 'password');
		
		const event = {
			request: {
				formData: async () => formData
			},
			cookies: {
				set: vi.fn()
			}
		} as any;

		// Mock user verification
		vi.mocked(authService.verifyPassword).mockResolvedValue(true);
		// Mock user lookup (needs to be implemented in authService)
		(authService as any).getUserByUsername = vi.fn().mockResolvedValue({ id: '1', username: 'admin', passwordHash: 'hash' });
		// Mock session creation
		vi.mocked(authService.createSession).mockResolvedValue({ id: 'session-id', userId: '1', expiresAt: new Date() });

		try {
			await actions.login(event);
		} catch (e: any) {
			expect(e.status).toBe(303);
			expect(e.location).toBe('/admin');
		}
		
		expect(event.cookies.set).toHaveBeenCalled();
	});
});

describe('Logout Actions', () => {
	it('should delete session cookie and invalidate session on logout', async () => {
		const event = {
			cookies: {
				get: vi.fn().mockReturnValue('session-id'),
				delete: vi.fn()
			}
		} as any;

		try {
			await (actions as any).logout(event);
		} catch (e: any) {
			expect(e.status).toBe(303);
			expect(e.location).toBe('/login');
		}
		
		expect(event.cookies.delete).toHaveBeenCalledWith('session', { path: '/' });
		expect(authService.invalidateSession).toHaveBeenCalledWith('session-id');
	});
});
