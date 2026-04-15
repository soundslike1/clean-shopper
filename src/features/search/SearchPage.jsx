import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'
import { searchProducts } from '../../lib/api/products'
import { getSavedProductIds, saveProduct, unsaveProduct } from '../../lib/api/saved-products'

const STATES = { IDLE: 'idle', LOADING: 'loading', RESULTS: 'results', EMPTY: 'empty', ERROR: 'error' }

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState(STATES.IDLE)
  const [error, setError] = useState(null)
  const [savedIds, setSavedIds] = useState(new Set())

  useEffect(() => {
    getSavedProductIds().then(setSavedIds).catch(() => {})
  }, [])

  async function handleSearch(value) {
    const term = value.trim()
    if (!term) return

    setStatus(STATES.LOADING)
    setError(null)

    try {
      const data = await searchProducts(term)
      setResults(data)
      setStatus(data.length > 0 ? STATES.RESULTS : STATES.EMPTY)
    } catch (err) {
      setError(err.message)
      setStatus(STATES.ERROR)
    }
  }

  async function toggleSave(id) {
    const isSaved = savedIds.has(id)
    setSavedIds((prev) => {
      const next = new Set(prev)
      isSaved ? next.delete(id) : next.add(id)
      return next
    })
    try {
      isSaved ? await unsaveProduct(id) : await saveProduct(id)
    } catch {
      setSavedIds((prev) => {
        const next = new Set(prev)
        isSaved ? next.add(id) : next.delete(id)
        return next
      })
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-lg py-xl">
      <h1 className="text-h1 font-serif text-neutral-900 mb-xl">Search Products</h1>

      <div className="max-w-2xl mb-xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          isLoading={status === STATES.LOADING}
        />
        {status === STATES.ERROR && (
          <p className="text-micro text-error mt-sm">{error}</p>
        )}
      </div>

      {status === STATES.IDLE && (
        <EmptyState
          heading="Search for a product"
          body="Type a product name, brand, or keyword to find ingredient safety assessments."
        />
      )}

      {status === STATES.EMPTY && (
        <EmptyState
          heading="No results found"
          body={`No products matched "${query}". Try a different name, brand, or keyword.`}
        />
      )}

      {status === STATES.RESULTS && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
          {results.map((product) => (
            <div key={product.id} className="flex flex-col gap-sm">
              <ProductCard
                name={product.name}
                safetyScore={product.safety_score}
                category={product.category}
                description={product.description}
              />
              <Button
                variant={savedIds.has(product.id) ? 'primary' : 'secondary'}
                onClick={() => toggleSave(product.id)}
              >
                {savedIds.has(product.id) ? 'Saved to List' : 'Save to List'}
              </Button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
