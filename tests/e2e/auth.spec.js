import { test, expect } from '@playwright/test'

// Unique email per test run so sign-ups never conflict
const email = `test+${Date.now()}@example.com`
const password = 'testpassword123'

test.describe('authentication flow', () => {
  test('sign up, sign out, and sign in', async ({ page }) => {
    // 1. Open the app — sign-in page loads
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible({ timeout: 5000 })

    // 2. Navigate to sign-up
    await page.getByRole('button', { name: 'Sign up' }).click()
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible()

    // 3. Create a new account
    await page.getByLabel('Email').fill(email)
    await page.getByLabel('Password').fill(password)
    await page.getByRole('button', { name: 'Create account' }).click()

    // 4. Lands on browse page after sign-up (allow time for Supabase round-trip)
    await expect(page.getByRole('heading', { name: 'Browse Products' })).toBeVisible({ timeout: 20000 })

    // 5. Sign out — back to sign-in page
    await page.getByRole('button', { name: 'Sign out' }).click()
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible({ timeout: 5000 })

    // 6. Sign in with the same credentials
    await page.getByLabel('Email').fill(email)
    await page.getByLabel('Password').fill(password)
    await page.getByRole('button', { name: 'Sign in' }).click()

    // 7. Lands on browse page after sign-in
    await expect(page.getByRole('heading', { name: 'Browse Products' })).toBeVisible({ timeout: 8000 })
  })
})
