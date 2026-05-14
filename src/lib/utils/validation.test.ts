import { describe, it, expect } from 'vitest';
import { checkKontaktForm } from './validation';

describe('Contact Form Validation', () => {
	it('should return errors if fields are empty', () => {
		const data = { name: '', email: '', subject: '', message: '' };
		const errors = checkKontaktForm(data);
		
		expect(errors.name).toBeDefined();
		expect(errors.email).toBeDefined();
		expect(errors.subject).toBeDefined();
		expect(errors.message).toBeDefined();
	});

	it('should return an error for invalid email format', () => {
		const data = { name: 'Max', email: 'invalid-email', subject: 'Hi', message: 'Hello world' };
		const errors = checkKontaktForm(data);
		
		expect(errors.email).toBe('Die E-Mail-Adresse sieht nicht richtig aus');
	});

	it('should return no errors for valid data', () => {
		const data = { name: 'Max', email: 'max@example.com', subject: 'Anfrage', message: 'Das ist eine Testnachricht.' };
		const errors = checkKontaktForm(data);
		
		expect(Object.keys(errors).length).toBe(0);
	});
});
