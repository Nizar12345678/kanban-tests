// tests/kanban.spec.ts
import { test, expect } from '@playwright/test';
import { login } from './utils/auth';
import testData from './testData.json';

for (const data of testData) {
    test(`Verify task "${data.task}" in ${data.app} (${data.column})`, async ({ page }) => {
        await login(page);

        // Navigate to app
        await page.getByText(data.app).click();

        // Find the correct column
        const column = page.locator(`.column:has-text("${data.column}")`);

        // Verify task is inside column
        await expect(column.getByText(data.task)).toBeVisible();

        // Verify tags
        for (const tag of data.tags) {
            await expect(column.getByText(tag)).toBeVisible();
        }
    });
}
