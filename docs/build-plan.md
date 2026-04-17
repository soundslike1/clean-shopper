# Build Plan: Clean Shopper
**Version:** 1.0
**Last Updated:** 2026-04-04

Build phase by phase. Do not jump ahead. Complete and verify each phase before starting the next.

---

## Status Snapshot

### Already done
- Project scaffold: Vite + React + Tailwind + Supabase SDK + Anthropic SDK installed
- Design system: tokens in `tailwind.config.js`, spec in `/docs/design-system.md`
- Component spec: `/docs/component-spec.md`
- Components built: `NavBar`, `ProductCard`, `SafetyBadge`, `CategoryTag`, `NotificationBanner`

### Not yet built
- Routing
- App shell layout
- Components: `Button`, `SearchBar`, `InputField`, `EmptyState`, `LoadingSpinner`
- Pages: Search, Library, Shopping List
- Claude API integration
- Supabase integration

---

## Phase 1 — App Shell, Routing, and Remaining Components

**Goal:** A navigable app skeleton. Every route resolves to a real page. All components from the spec exist and render correctly.

### Tasks
1. Install `react-router-dom`
2. Update `App.jsx` with a layout shell: `NavBar` at the top, `<Outlet />` below, `bg-neutral-50` full-height wrapper
3. Define routes: `/search`, `/library`, `/list` — each renders a stub page component
4. Wire `NavBar` active state to current route via `useLocation`
5. Build `Button` component per spec
6. Build `SearchBar` component per spec (uses `Button` internally)
7. Build `InputField` component per spec
8. Build `EmptyState` component per spec (uses `Button` internally)
9. Build `LoadingSpinner` component — simple animated ring in `text-primary`
10. Add `Button` and `InputField` to `component-spec.md` if not already there

**Done when:** All three routes load without errors, `NavBar` highlights the active link, and all components render in isolation.

---

## Phase 2 — Search Page

**Goal:** A user can type a product query, see a loading state, and get back a grid of product results rendered as `ProductCard` components. Results are mocked — no real API call yet.

### Tasks
1. Build `SearchPage` in `/src/pages/SearchPage.jsx`
2. Layout: centered max-width container, `SearchBar` at the top, results grid below
3. Results grid: responsive 1–3 column grid of `ProductCard` components
4. Three states to handle:
   - **Empty/initial:** `EmptyState` with heading "Search for a product" and body "Type a product name or category to get started."
   - **Loading:** `LoadingSpinner` centered below the search bar
   - **Results:** grid of `ProductCard` components
5. Wire mock data: hardcode 3–4 sample products so the results state is visible and testable before the API is connected

**Done when:** Typing in the search bar and clicking Search cycles through all three states using mock data.

---

## Phase 3 — Claude API Integration

**Goal:** The search page calls the Claude API and returns real AI-generated product assessments.

### Tasks
1. Create `/src/lib/api/claude.js` — exports a `searchProducts(query)` function
2. `searchProducts` calls the Claude API (`claude-sonnet-4-20250514`) with a structured prompt that returns an array of products: `{ name, category, safetyScore, description }`
3. Prompt instructs Claude to assess ingredient safety, classify each product as `clean`, `caution`, or `avoid`, and return a short plain-language description
4. Handle API errors gracefully: surface a user-facing error message via `NotificationBanner`
5. Wire `searchProducts` into `SearchPage` — replace mock data with live results

**Done when:** A real search query returns Claude-generated product assessments rendered as `ProductCard` components.

---

## Phase 4 — Library Page + Supabase

**Goal:** Users can save products from search results to their personal library, which persists in Supabase. The library page displays saved products grouped by category.

### Tasks
1. Create Supabase client in `/src/lib/supabase.js`
2. Create `products` table in Supabase: `id`, `name`, `category`, `safety_score`, `description`, `created_at`
3. Create `/src/lib/api/products.js` — exports `saveProduct(product)`, `getProducts()`, `deleteProduct(id)`
4. Add "Save" button to `ProductCard` (only shown on search results, not in library)
5. Build `LibraryPage` in `/src/pages/LibraryPage.jsx`
6. Layout: section headers per category, `ProductCard` grid within each section
7. Two states:
   - **Empty:** `EmptyState` with heading "Nothing saved yet" and action linking to Search
   - **Populated:** products grouped by category, each with a remove button
8. Add `ProductContext` in `/src/context/ProductContext.jsx` — holds saved products in state, exposes save and remove actions, syncs with Supabase on mount

**Done when:** A product saved from search appears in the library after page reload.

---

## Phase 5 — Shopping List

**Goal:** Users can add products from their library to a shopping list. The shopping list persists in Supabase and can be cleared or managed item by item.

### Tasks
1. Create `shopping_list` table in Supabase: `id`, `product_id`, `name`, `category`, `added_at`
2. Create `/src/lib/api/shoppingList.js` — exports `addToList(product)`, `getList()`, `removeFromList(id)`, `clearList()`
3. Add "Add to list" button on `LibraryPage` product cards
4. Build `ShoppingListPage` in `/src/pages/ShoppingListPage.jsx`
5. Layout: flat list of items with product name, category tag, and remove button per item; "Clear list" destructive action at the top
6. Two states:
   - **Empty:** `EmptyState` with heading "Your list is empty" and action linking to Library
   - **Populated:** list of items with per-item remove and a clear-all button
7. Add shopping list state to `ProductContext` or create a separate `ListContext`

**Done when:** Adding a product from the library to the list and reloading the page shows it on the shopping list.

---

## Out of Scope for V1
- User authentication
- Barcode scanning
- Retailer integrations or checkout
- Mobile app
- Preference management (ingredients to avoid, trusted brands) — post-V1
- Product comparison view — post-V1
