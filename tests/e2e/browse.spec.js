import { test, expect } from '@playwright/test'

const email = process.env.TEST_EMAIL ?? 'test@example.com'
const password = process.env.TEST_PASSWORD ?? 'testpassword123'

async function signIn(page) {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible({ timeout: 5000 })
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Log in' }).click()
  await expect(page.getByRole('heading', { name: 'Browse Products' })).toBeVisible({ timeout: 10000 })
}

test.describe('browse', () => {
  test('browse page loads products grouped by category', async ({ page }) => {
    await signIn(page)

    // At least one product card is visible
    const cards = page.locator('article')
    await expect(cards.first()).toBeVisible({ timeout: 10000 })

    // Products are grouped under category section headings (h2)
    const categoryHeadings = page.getByRole('heading', { level: 2 })
    await expect(categoryHeadings.first()).toBeVisible()

    const headingCount = await categoryHeadings.count()
    expect(headingCount).toBeGreaterThan(0)
  })

  test('clicking a product card opens the ingredient detail page', async ({ page }) => {
    await signIn(page)

    // Wait for products to load then click the first card
    const firstCard = page.locator('article').first()
    await expect(firstCard).toBeVisible({ timeout: 10000 })

    // Grab the product name before clicking so we can verify it on the detail page
    const productName = await firstCard.getByRole('heading').innerText()
    await firstCard.click()

    // Detail page shows the product name as the h1 and an Ingredients section
    await expect(page.getByRole('heading', { name: productName, level: 1 })).toBeVisible({ timeout: 5000 })
    await expect(page.getByRole('heading', { name: 'Ingredients' })).toBeVisible()

    // Back button returns to the browse grid
    await page.getByRole('button', { name: '← Back' }).click()
    await expect(page.getByRole('heading', { name: 'Browse Products' })).toBeVisible()
  })
})
