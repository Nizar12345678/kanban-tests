// tests/case3.spec.ts
import { test, expect } from '@playwright/test';
import { login } from './utils/auth';

test('TC3: Web Application → "Design system updates" in "In Progress" with tag "Design"', async ({ page }) => {
    // 1) Login
    await login(page);

    // 2) Navigate to "Web Application"
    await page.getByRole('button', { name: /Web Application/i }).first().click();
    await page.waitForLoadState('networkidle');

    // 3) Find the "In Progress" column
    const inProgressColumn = page.locator('section:has-text("In Progress"), div:has-text("In Progress")').first();
    await expect(inProgressColumn).toBeVisible({ timeout: 10_000 });

    // 4) Verify the card title inside that column
    const cardTitle = inProgressColumn.locator('xpath=.//*[normalize-space()="Design system updates"]').first();
    await expect(cardTitle).toBeVisible({ timeout: 10_000 });

    // 5) Confirm tag "Design" within the same card
    const cardContainer = cardTitle.locator('xpath=ancestor::*[self::article or self::div][1]');
    const designTagChip = cardContainer.locator('xpath=.//span[normalize-space()="Design"]').first();
    await expect(designTagChip).toBeVisible({ timeout: 10_000 });
});
