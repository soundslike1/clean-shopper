# Component Specification: Clean Shopper
**Version:** 1.0
**Last Updated:** 2026-03-31

All visual values reference Tailwind theme classes from `tailwind.config.js`. No hex colors, pixel sizes, or spacing values are hardcoded anywhere in this document or in the components that implement these specs.

---

## ProductCard

**Purpose:** Displays a product summary — name, safety score, category, and description — in a tappable card surface used on search results and the saved library.

### Props
| Prop | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | Product name |
| `safetyScore` | `'clean' \| 'caution' \| 'avoid'` | yes | Drives SafetyBadge variant |
| `category` | string | yes | Passed to CategoryTag |
| `description` | string | yes | Short product description |
| `onClick` | function | no | Called when the card is clicked |

### Visual Structure
```
<article>  bg-secondary rounded-lg shadow-sm p-lg flex flex-col gap-sm
  hover: shadow-md

  <header>  flex items-start justify-between gap-sm
    <h3>     text-h3 text-neutral-900
    <SafetyBadge size="sm" />

  <CategoryTag />

  <p>        text-body text-neutral-600
```

### States
| State | Treatment |
|---|---|
| Default | `shadow-sm` on card surface |
| Hover | `shadow-md`, cursor pointer |

### Usage Rules
- Use for every product in search results and the library grid/list.
- Do not use for shopping list line items — those are a simpler row layout.
- Always supply all four required props; do not render the card with missing data.
- Card padding must be `p-lg` minimum — never tighten to `p-md` or below.

---

## SafetyBadge

**Purpose:** Renders a color-coded clean / caution / avoid label that communicates an ingredient safety assessment at a glance.

### Props
| Prop | Type | Required | Notes |
|---|---|---|---|
| `score` | `'clean' \| 'caution' \| 'avoid'` | yes | Controls color and label |
| `size` | `'sm' \| 'md'` | no | Defaults to `'md'` |

### Visual Structure
```
<span>  rounded-sm font-medium text-neutral-50

  size="sm"  text-micro  px-sm py-xs    — used inside ProductCard
  size="md"  text-small  px-md py-sm    — used on product detail page

  score="clean"   bg-success
  score="caution" bg-warning
  score="avoid"   bg-error
```

### States
| State | Treatment |
|---|---|
| Default | Solid semantic background, `text-neutral-50` label |

### Usage Rules
- Use `size="sm"` inside `ProductCard` to keep badge compact within the card header.
- Use `size="md"` on the product detail page where the badge is a primary piece of information.
- Do not use success green, warning amber, or error red for any purpose other than the three safety states — these colors carry fixed semantic meaning.
- Label text is always sentence-case: "Clean", "Caution", "Avoid".

---

## SearchBar

**Purpose:** Accepts a product search query and triggers the search action; used as the primary entry point on the search page and in the library header.

### Props
| Prop | Type | Required | Notes |
|---|---|---|---|
| `value` | string | yes | Controlled input value |
| `onChange` | function | yes | Called on every keystroke |
| `onSubmit` | function | yes | Called on Enter or button click |
| `placeholder` | string | no | Defaults to `"Search products…"` |
| `isLoading` | boolean | no | Disables input and shows spinner in button |

### Visual Structure
```
<form>  flex items-center gap-sm

  <input>   flex-1 bg-neutral-100 text-body text-neutral-900
            placeholder:text-neutral-400
            rounded-md px-md py-sm
            border border-neutral-200
            focus: outline-none ring-2 ring-primary

  <Button variant="primary" type="submit">
            loading state when isLoading=true
```

### States
| State | Treatment |
|---|---|
| Default | `border-neutral-200`, `bg-neutral-100` |
| Focus | `ring-2 ring-primary`, no default browser outline |
| Loading | Input disabled, Button shows `LoadingSpinner`, cursor not-allowed |
| Error | `ring-2 ring-error` on input (consumer sets this via prop) |

### Usage Rules
- Use as the sole search entry point — do not build inline search inputs elsewhere.
- The submit Button must always use `variant="primary"`.
- Do not use this component for filtering — use `FilterChip` for category/safety filters.

---

## CategoryTag

**Purpose:** Displays a product category as a small pill label; used on `ProductCard`, library section headers, and filter chips.

### Props
| Prop | Type | Required | Notes |
|---|---|---|---|
| `label` | string | yes | Category name |

### Visual Structure
```
<span>  text-micro font-medium text-accent
        bg-neutral-200 rounded-sm px-sm py-xs
        self-start
```

### States
| State | Treatment |
|---|---|
| Default | Static display only — no interactive states |

### Usage Rules
- Use for read-only category display inside `ProductCard` and on the product detail page.
- Do not use `CategoryTag` for interactive filtering — use `FilterChip` (toggleable) instead.
- Always `self-start` or `inline-flex` — never stretch to full width.

---

## NavBar

**Purpose:** Persistent top navigation bar showing the app name and links to the main sections of the app; appears on every view.

### Props
| Prop | Type | Required | Notes |
|---|---|---|---|
| `activeRoute` | string | yes | Current route path, used to set active link style |

### Visual Structure
```
<nav>  bg-neutral-100 border-b border-neutral-200 px-lg py-md
       flex items-center justify-between shadow-sm

  <span>  text-h4 font-medium text-primary       — app name "Clean Shopper"

  <ul>    flex items-center gap-lg

    <li> each nav link:
      Default:  text-small text-neutral-600
      Active:   text-small text-primary font-medium border-b-2 border-primary
      Hover:    text-primary
```

### States
| State | Treatment |
|---|---|
| Default link | `text-neutral-600` |
| Active link | `text-primary font-medium` with `border-b-2 border-primary` underline |
| Hover link | `text-primary`, cursor pointer |

### Usage Rules
- Render once at the app layout level — do not nest NavBar inside page components.
- The app name is not a link in V1 (single-user, no home/marketing page).
- Nav link labels are: Search, My Library, Shopping List.
- Do not add icons to nav links in V1 — text only.

---

## Button

**Purpose:** The standard interactive trigger for all primary and secondary actions across the app; covers search submission, saving products, adding to lists, and destructive actions.

### Props
| Prop | Type | Required | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'destructive'` | no | Defaults to `'primary'` |
| `type` | `'button' \| 'submit' \| 'reset'` | no | Defaults to `'button'` |
| `isLoading` | boolean | no | Replaces label with spinner, disables button |
| `disabled` | boolean | no | Disables interaction |
| `onClick` | function | no | Click handler |
| `children` | node | yes | Button label content |

### Visual Structure
```
<button>  text-small font-medium rounded-md px-md py-sm
          transition-colors duration-150
          disabled: opacity-50 cursor-not-allowed

  variant="primary"
    Default:  bg-primary text-neutral-50
    Hover:    bg-primary-light
    Pressed:  bg-primary-dark

  variant="secondary"
    Default:  bg-transparent text-primary border border-primary
    Hover:    bg-secondary
    Pressed:  bg-neutral-200

  variant="destructive"
    Default:  bg-error text-neutral-50
    Hover:    opacity-90
    Pressed:  opacity-80
```

### States
| State | Treatment |
|---|---|
| Default | Per variant above |
| Hover | Per variant above |
| Pressed | Per variant above |
| Loading | `isLoading=true`: label replaced by `LoadingSpinner`, `disabled` applied |
| Disabled | `opacity-50 cursor-not-allowed`, no hover effect |

### Usage Rules
- Use `variant="primary"` for the single most important action per view — search submit, save product, add to list.
- Use `variant="secondary"` for supporting actions alongside a primary button — e.g., "Cancel" next to "Save".
- Use `variant="destructive"` only for irreversible actions: delete, remove from library, clear list.
- Never place two `primary` buttons side by side — one primary action per context.
- Button width is hug-content by default; stretch to full width only inside forms where the field is also full width.

---

## InputField

**Purpose:** Labeled text input with optional helper text and error state; used in any form that collects user input beyond the main search bar.

### Props
| Prop | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Links `<label>` to `<input>` |
| `label` | string | yes | Field label displayed above input |
| `value` | string | yes | Controlled value |
| `onChange` | function | yes | Change handler |
| `type` | string | no | Defaults to `'text'` |
| `placeholder` | string | no | Input placeholder text |
| `helperText` | string | no | Supporting copy below the input |
| `error` | string | no | Error message; presence triggers error state |
| `disabled` | boolean | no | Disables the input |

### Visual Structure
```
<div>  flex flex-col gap-xs

  <label>   text-h4 text-neutral-900

  <input>   bg-neutral-100 text-body text-neutral-900
            placeholder:text-neutral-400
            rounded-md px-md py-sm
            border border-neutral-200
            focus: outline-none ring-2 ring-primary
            disabled: opacity-50 cursor-not-allowed

            error state:
            border-error ring-2 ring-error

  <p>       helper text:  text-micro text-neutral-600
            error text:   text-micro text-error
```

### States
| State | Treatment |
|---|---|
| Default | `border-neutral-200`, `bg-neutral-100` |
| Focus | `ring-2 ring-primary`, remove default outline |
| Error | `border-error ring-2 ring-error`; error message replaces or appends to helper text in `text-error` |
| Disabled | `opacity-50 cursor-not-allowed` on input and label |

### Usage Rules
- Always pair the input with a visible `<label>` — do not use placeholder text as the only label.
- Show `helperText` for format guidance (e.g., "Enter a brand name or UPC"). Show `error` for validation failures.
- Do not use `InputField` for the main product search — use `SearchBar` instead.

---

## EmptyState

**Purpose:** Fills a zero-content area with a contextual message and optional action, preventing blank screens when a list or search has no results.

### Props
| Prop | Type | Required | Notes |
|---|---|---|---|
| `heading` | string | yes | Short headline for the empty state |
| `body` | string | yes | One or two sentences explaining why it's empty and what to do |
| `action` | `{ label: string, onClick: function }` | no | Renders a primary Button if provided |

### Visual Structure
```
<div>  flex flex-col items-center text-center gap-md
       py-3xl px-lg

  <p>  text-h3 text-neutral-900     — heading
  <p>  text-body text-neutral-600   — body copy
  <Button variant="primary" />      — only if action prop provided
```

### States
| State | Treatment |
|---|---|
| Default | Static — no interactive states on the container itself |
| With action | Renders a `primary` Button below body copy |
| Without action | Body copy is the final element |

### Usage Rules
- Use on the library view when no products are saved, and on search results when the query returns no matches.
- The `heading` should name the situation: "Nothing saved yet", "No results for that search".
- The `body` should tell the user what to do next — never leave them with a dead end.
- Do not add decorative illustrations in V1 — text and optional button only.
- `py-3xl` vertical padding is intentional — empty states need breathing room to avoid feeling broken.
