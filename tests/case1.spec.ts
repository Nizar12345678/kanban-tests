// tests/case1.spec.ts
import { test, expect } from '@playwright/test';
import { login } from './utils/auth';

test('TC1: Web Application → "Implement user authentication" in "To Do" with tags', async ({ page }) => {
    // 1) Login
    await login(page);

    // 2) Navigate to "Web Application"
    await page.getByRole('button', { name: /Web Application/i }).first().click();
    await page.waitForLoadState('networkidle');

    // 3) Find the "To Do" column container using broad, resilient filters.
    //    We match any <section> or <div> that CONTAINS the text "To Do".
    //    (This avoids assumptions about exact heading tags or nesting.)
    const toDoColumn = page
        .locator('section:has-text("To Do"), div:has-text("To Do")')
        .first();

    // Sanity: ensure the column is visible
    await expect(toDoColumn).toBeVisible({ timeout: 10_000 });

    // 4) Inside that column, assert the specific card title exists
    const cardTitle = toDoColumn.locator('xpath=.//*[normalize-space()="Implement user authentication"]').first();
    await expect(cardTitle).toBeVisible({ timeout: 10_000 });

    // 5) From the title, scope to its nearest card container, then assert tags within it
    const cardContainer = cardTitle.locator('xpath=ancestor::*[self::article or self::div][1]');
    await expect(cardContainer.locator('xpath=.//*[normalize-space()="Feature"]')).toBeVisible({ timeout: 10_000 });
    await expect(cardContainer.locator('xpath=.//*[normalize-space()="High Priority"]')).toBeVisible({ timeout: 10_000 });
});
