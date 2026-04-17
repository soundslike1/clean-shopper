/**
 * Smoke test: verifies the app home page loads without errors.
 * Requires the dev server to be running on port 5173.
 * Run with: node scripts/smoke-test.js
 */

const BASE_URL = 'http://localhost:5173'
let passed = 0
let failed = 0

function ok(label) {
  console.log(`  ✓ ${label}`)
  passed++
}

function fail(label, detail) {
  console.error(`  ✗ ${label}`)
  if (detail) console.error(`    ${detail}`)
  failed++
}

async function runTests() {
  console.log('\nSmoke test — Clean Shopper home page\n')

  // Test 1: server responds
  let res, html
  try {
    res = await fetch(BASE_URL)
    html = await res.text()
  } catch (err) {
    fail('Dev server is reachable', `Could not connect to ${BASE_URL} — is it running?`)
    console.log(`\n0 passed, 1 failed\n`)
    process.exit(1)
  }

  // Test 2: status 200
  if (res.status === 200) {
    ok(`Response status is 200`)
  } else {
    fail(`Response status is 200`, `Got ${res.status}`)
  }

  // Test 3: content-type is HTML
  const contentType = res.headers.get('content-type') ?? ''
  if (contentType.includes('text/html')) {
    ok('Response content-type is text/html')
  } else {
    fail('Response content-type is text/html', `Got "${contentType}"`)
  }

  // Test 4: HTML contains root mount point
  if (html.includes('<div id="root">')) {
    ok('HTML contains <div id="root">')
  } else {
    fail('HTML contains <div id="root">', 'Root mount point missing — app may not initialise')
  }

  // Test 5: Vite client script is present (confirms dev server serving correctly)
  if (html.includes('/@vite/client') || html.includes('/src/main.')) {
    ok('Vite entry script is referenced in HTML')
  } else {
    fail('Vite entry script is referenced in HTML', 'Expected /@vite/client or /src/main.*')
  }

  // Test 6: no obvious server-level error page
  const lowerHtml = html.toLowerCase()
  if (!lowerHtml.includes('cannot get') && !lowerHtml.includes('404') && !lowerHtml.includes('error')) {
    ok('HTML does not contain server error indicators')
  } else {
    fail('HTML does not contain server error indicators', 'Found "cannot get", "404", or "error" in HTML')
  }

  console.log(`\n${passed} passed, ${failed} failed\n`)
  process.exit(failed > 0 ? 1 : 0)
}

runTests()
