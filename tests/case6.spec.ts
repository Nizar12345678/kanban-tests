// tests/case6.spec.ts
import { test, expect } from '@playwright/test';
import { login } from './utils/auth';

test('TC6: Mobile Application → "App icon design" in "Done" with tag "Design"', async ({ page }) => {
    // 1) Login
    await login(page);

    // 2) Navigate to "Mobile Application"
    await page.getByRole('button', { name: /Mobile Application/i }).first().click();
    await page.waitForLoadState('networkidle');

    // 3) Find the "Done" column
    const doneColumn = page.locator('section:has-text("Done"), div:has-text("Done")').first();
    await expect(doneColumn).toBeVisible({ timeout: 10_000 });

    // 4) Verify the card title inside that column
    const cardTitle = doneColumn.locator('xpath=.//*[normalize-space()="App icon design"]').first();
    await expect(cardTitle).toBeVisible({ timeout: 10_000 });

    // 5) Confirm tag "Design" within the same card
    const cardContainer = cardTitle.locator('xpath=ancestor::*[self::article or self::div][1]');
    const designTagChip = cardContainer.locator('xpath=.//span[normalize-space()="Design"]').first();
    await expect(designTagChip).toBeVisible({ timeout: 10_000 });
});
