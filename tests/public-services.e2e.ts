import { test, expect } from '@playwright/test';

test.describe('Public Website - Leistungen', () => {
	test('should display the services listing page', async ({ page }) => {
		await page.goto('/leistungen');
		const heading = page.getByRole('heading', { name: 'Unsere Leistungen' });
		await expect(heading).toBeVisible();
	});

	test('should navigate to a service detail page', async ({ page }) => {
		// This test assumes at least one service exists from our manual test
		await page.goto('/leistungen');
		const serviceLink = page.locator('a[href^="/leistungen/"]').first();
		if (await serviceLink.isVisible()) {
			await serviceLink.click();
			await expect(page.url()).toContain('/leistungen/');
		}
	});
});
