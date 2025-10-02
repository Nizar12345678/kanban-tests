// tests/case4.spec.ts
import { test, expect } from '@playwright/test';
import { login } from './utils/auth';

test('TC4: Mobile Application → "Push notification system" in "To Do" with tag "Feature"', async ({ page }) => {
    // 1) Login
    await login(page);

    // 2) Navigate to "Mobile Application"
    await page.getByRole('button', { name: /Mobile Application/i }).first().click();
    await page.waitForLoadState('networkidle');

    // 3) Find the "To Do" column
    const toDoColumn = page.locator('section:has-text("To Do"), div:has-text("To Do")').first();
    await expect(toDoColumn).toBeVisible({ timeout: 10_000 });

    // 4) Verify the card title inside that column
    const cardTitle = toDoColumn.locator('xpath=.//*[normalize-space()="Push notification system"]').first();
    await expect(cardTitle).toBeVisible({ timeout: 10_000 });

    // 5) Confirm tag "Feature" within the same card
    const cardContainer = cardTitle.locator('xpath=ancestor::*[self::article or self::div][1]');
    const featureTagChip = cardContainer.locator('xpath=.//span[normalize-space()="Feature"]').first();
    await expect(featureTagChip).toBeVisible({ timeout: 10_000 });
});
