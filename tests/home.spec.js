import { test, expect } from '@playwright/test'

test('home page loads without errors', async ({ page }) => {
  const errors = []
  page.on('pageerror', (err) => errors.push(err.message))

  await page.goto('/')

  // App root mounts
  await expect(page.locator('#root')).toBeAttached()

  // Page renders something visible (not blank)
  await expect(page.locator('#root')).not.toBeEmpty()

  // No uncaught JS errors
  expect(errors).toHaveLength(0)
})

test('sign-in page is shown to unauthenticated users', async ({ page }) => {
  await page.goto('/')

  // Wait for auth check to resolve — sign-in form should appear
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible({ timeout: 5000 })
})
