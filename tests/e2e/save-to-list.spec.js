import { test, expect } from '@playwright/test'

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

async function searchFor(page, term) {
  await page.getByRole('link', { name: 'Search' }).click()
  await expect(page.getByRole('heading', { name: 'Search Products' })).toBeVisible()
  await page.getByPlaceholder('Search products…').fill(term)
  await page.getByRole('button', { name: 'Search' }).click()
  await expect(page.locator('article').first()).toBeVisible({ timeout: 10000 })
}

test.describe('save to list', () => {
  test('saving a product persists after page refresh', async ({ page }) => {
    await signIn(page)
    await searchFor(page, 'care')

    // Find the first product card and the Save to List button next to it
    const firstCardWrapper = page.locator('article').first().locator('..')
    const saveButton = firstCardWrapper.getByRole('button', { name: 'Save to List' })

    // Capture the product name so we can find the same card after reload
    const productName = await page.locator('article').first().getByRole('heading').innerText()

    // Save the product — button should immediately update to "Saved to List"
    await saveButton.click()
    await expect(firstCardWrapper.getByRole('button', { name: 'Saved to List' })).toBeVisible()

    // Reload the page — Supabase session is stored in localStorage, so user stays signed in
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Browse Products' })).toBeVisible({ timeout: 10000 })

    // Search again for the same term and find the same product
    await searchFor(page, 'care')
    const savedCard = page.locator('article', { hasText: productName }).locator('..')
    await expect(savedCard.getByRole('button', { name: 'Saved to List' })).toBeVisible({ timeout: 5000 })
  })
})
