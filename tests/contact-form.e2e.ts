import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
	test('should show validation errors on empty submission', async ({ page }) => {
		await page.goto('/kontakt');
		await page.click('button[type="submit"]');
		
		const nameError = page.locator('text=Name muss mindestens 2 Zeichen lang sein');
		await expect(nameError).toBeVisible();
	});

	test('should show success message on valid submission', async ({ page }) => {
		await page.goto('/kontakt');
		await page.fill('input[name="name"]', 'Max Mustermann');
		await page.fill('input[name="email"]', 'max@example.com');
		await page.fill('input[name="subject"]', 'Test Anfrage');
		await page.fill('textarea[name="message"]', 'Dies ist eine Testnachricht mit ausreichend Länge.');
		
		await page.click('button[type="submit"]');
		
		const successMessage = page.locator('text=Vielen Dank für Ihre Nachricht!');
		await expect(successMessage).toBeVisible();
	});
});
