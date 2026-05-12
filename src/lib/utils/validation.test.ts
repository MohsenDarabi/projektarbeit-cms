import { describe, it, expect } from 'vitest';
import { validateContactForm } from './validation';

describe('Contact Form Validation', () => {
	it('should return errors if fields are empty', () => {
		const data = { name: '', email: '', subject: '', message: '' };
		const errors = validateContactForm(data);
		
		expect(errors.name).toBeDefined();
		expect(errors.email).toBeDefined();
		expect(errors.subject).toBeDefined();
		expect(errors.message).toBeDefined();
	});

	it('should return an error for invalid email format', () => {
		const data = { name: 'Max', email: 'invalid-email', subject: 'Hi', message: 'Hello world' };
		const errors = validateContactForm(data);
		
		expect(errors.email).toBe('Ungültige E-Mail-Adresse');
	});

	it('should return no errors for valid data', () => {
		const data = { name: 'Max', email: 'max@example.com', subject: 'Anfrage', message: 'Das ist eine Testnachricht.' };
		const errors = validateContactForm(data);
		
		expect(Object.keys(errors).length).toBe(0);
	});
});
