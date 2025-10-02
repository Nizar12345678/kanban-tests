// tests/utils/auth.ts
import { expect, Page } from '@playwright/test';

export async function login(page: Page) {
    await page.goto('/'); // uses baseURL from playwright.config.ts

    // ---- Email field
    const emailInput = page.locator(
        'input[placeholder*="email" i], input[name*="email" i], input[type="email"], input[type="text"]'
    ).first();
    await emailInput.waitFor({ state: 'visible', timeout: 5000 });
    await emailInput.fill('admin');

    // ---- Password field
    const passwordInput = page.locator(
        'input[placeholder*="pass" i], input[name*="pass" i], input[type="password"]'
    ).first();
    await passwordInput.waitFor({ state: 'visible', timeout: 5000 });
    await passwordInput.fill('password123');

    // ---- Login button
    const loginButton = page.getByRole('button', { name: /login|sign in|submit/i }).first();
    await loginButton.click();

    // ---- Assert login succeeded (unique locators to avoid strict mode errors)
    await expect(page.getByRole('button', { name: /Web Application/i }).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: /Mobile Application/i }).first()).toBeVisible({ timeout: 10000 });
}


