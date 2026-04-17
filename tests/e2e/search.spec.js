import { test, expect } from '@playwright/test'

// Create this account once via the app's sign-up page, then set these env vars.
const email = process.env.TEST_EMAIL ?? 'test@example.com'
const password = process.env.TEST_PASSWORD ?? 'testpassword123'

async function signIn(page) {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible({ timeout: 5000 })
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByRole('heading', { name: 'Browse Products' })).toBeVisible({ timeout: 10000 })
}

test.describe('search', () => {
  test('search returns results with product name and safety score', async ({ page }) => {
    await signIn(page)

    // Navigate to Search via the nav link
    await page.getByRole('link', { name: 'Search' }).click()
    await expect(page.getByRole('heading', { name: 'Search Products' })).toBeVisible()

    // Type a broad term and submit
    await page.getByPlaceholder('Search products…').fill('care')
    await page.getByRole('button', { name: 'Search' }).click()

    // At least one product card appears
    const cards = page.locator('article')
    await expect(cards.first()).toBeVisible({ timeout: 10000 })

    const count = await cards.count()
    expect(count).toBeGreaterThan(0)

    // Each visible card has a non-empty product name and a safety score badge
    for (let i = 0; i < Math.min(count, 3); i++) {
      const card = cards.nth(i)
      await expect(card.getByRole('heading')).not.toBeEmpty()
      await expect(card.locator('text=/Clean|Caution|Avoid/')).toBeVisible()
    }
  })

  test('search with no match shows empty state', async ({ page }) => {
    await signIn(page)

    await page.getByRole('link', { name: 'Search' }).click()
    await page.getByPlaceholder('Search products…').fill('xyzzy_no_match_12345')
    await page.getByRole('button', { name: 'Search' }).click()

    await expect(page.getByText('No results found')).toBeVisible({ timeout: 10000 })
  })
})
