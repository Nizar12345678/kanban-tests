// tests/case2.spec.ts
import { test, expect } from '@playwright/test';
import { login } from './utils/auth';

test('TC2: Web Application → "Fix navigation bug" in "To Do" with tag "Bug"', async ({ page }) => {
    await login(page);

    await page.getByRole('button', { name: /Web Application/i }).first().click();
    await page.waitForLoadState('networkidle');

    const toDoColumn = page.locator('section:has-text("To Do"), div:has-text("To Do")').first();
    await expect(toDoColumn).toBeVisible({ timeout: 10_000 });

    const cardTitle = toDoColumn.locator('xpath=.//*[normalize-space()="Fix navigation bug"]').first();
    await expect(cardTitle).toBeVisible({ timeout: 10_000 });

    const cardContainer = cardTitle.locator('xpath=ancestor::*[self::article or self::div][1]');
    const bugTagChip = cardContainer.locator('xpath=.//span[normalize-space()="Bug"]').first();
    await expect(bugTagChip).toBeVisible({ timeout: 10_000 });
});
