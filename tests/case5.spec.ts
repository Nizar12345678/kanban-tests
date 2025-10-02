// tests/case5.spec.ts
import { test, expect } from '@playwright/test';
import { login } from './utils/auth';

test('TC5: Mobile Application → "Offline mode" in "In Progress" with tags "Feature" & "High Priority"', async ({ page }) => {
    // 1) Login
    await login(page);

    // 2) Navigate to "Mobile Application"
    await page.getByRole('button', { name: /Mobile Application/i }).first().click();
    await page.waitForLoadState('networkidle');

    // 3) Find the "In Progress" column
    const inProgressColumn = page.locator('section:has-text("In Progress"), div:has-text("In Progress")').first();
    await expect(inProgressColumn).toBeVisible({ timeout: 10_000 });

    // 4) Verify the card title inside that column
    const cardTitle = inProgressColumn.locator('xpath=.//*[normalize-space()="Offline mode"]').first();
    await expect(cardTitle).toBeVisible({ timeout: 10_000 });

    // 5) Confirm tags within the same card
    const cardContainer = cardTitle.locator('xpath=ancestor::*[self::article or self::div][1]');
    await expect(cardContainer.locator('xpath=.//span[normalize-space()="Feature"]').first()).toBeVisible({ timeout: 10_000 });
    await expect(cardContainer.locator('xpath=.//span[normalize-space()="High Priority"]').first()).toBeVisible({ timeout: 10_000 });
});
