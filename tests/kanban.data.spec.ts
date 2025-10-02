import { test, expect } from '@playwright/test';
import { login } from './utils/auth';
import scenarios from './data/scenarios.json';

type Scenario = {
    board: 'Web Application' | 'Mobile Application';
    title: string;
    column: 'To Do' | 'In Progress' | 'Done';
    tags: string[];
};

test.describe('Kanban validations (data-driven)', () => {
    for (const s of scenarios as Scenario[]) {
        test(`${s.board} → "${s.title}" in "${s.column}" with tags [${s.tags.join(', ')}]`, async ({ page }) => {
            // 1) Login
            await login(page);

            await page.getByRole('button', { name: new RegExp(s.board, 'i') }).first().click();

// 2 npx playwright test tests/kanban.data.spec.ts --headedWait for the board header to show (more reliable than 'networkidle', esp. in Firefox)
            await expect(
                page.getByRole('banner').getByRole('heading', { name: new RegExp(s.board, 'i') })
            ).toBeVisible({ timeout: 10_000 });


            // 3) Find the column (flexible selector)
            const column = page.locator(
                `section:has-text("${s.column}"), div:has-text("${s.column}")`
            ).first();
            await expect(column).toBeVisible({ timeout: 10_000 });

            // 4) Card title inside that column
            const cardTitle = column.locator(
                `xpath=.//*[normalize-space()="${s.title}"]`
            ).first();
            await expect(cardTitle).toBeVisible({ timeout: 10_000 });

            // 5) Tags within the same card container
            const cardContainer = cardTitle.locator('xpath=ancestor::*[self::article or self::div][1]');
            for (const tag of s.tags) {
                const tagChip = cardContainer.locator(`xpath=.//span[normalize-space()="${tag}"]`).first();
                await expect(tagChip).toBeVisible({ timeout: 10_000 });
            }
        });
    }
});
