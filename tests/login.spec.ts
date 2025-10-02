// tests/login.spec.ts
import { test } from '@playwright/test';
import { login } from './utils/auth';

test('Login to Demo App shows project boards', async ({ page }) => {
    await login(page); // calls our helper
});
