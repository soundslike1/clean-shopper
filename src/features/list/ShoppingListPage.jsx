import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'
import { getProducts } from '../../lib/api/products'
import { getSavedProductIds, saveProduct, unsaveProduct } from '../../lib/api/saved-products'

export default function ShoppingListPage({ onProductClick }) {
  const [products, setProducts] = useState([])
  const [savedIds, setSavedIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))

    getSavedProductIds()
      .then(setSavedIds)
      .catch(() => {})
  }, [])

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

  const categories = [...new Set(products.map((p) => p.category))]

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-50 px-lg py-xl flex items-center justify-center">
        <p className="text-body text-neutral-600">Loading products…</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-neutral-50 px-lg py-xl flex items-center justify-center">
        <p className="text-body text-error">Failed to load products: {error}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-lg py-xl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-h1 font-serif text-neutral-900 mb-xl">Shopping List</h1>

        <div className="flex flex-col gap-xl">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="text-h2 font-serif text-neutral-900 mb-md">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
                {products.filter((p) => p.category === category).map((product) => (
                  <div key={product.id} className="flex flex-col gap-sm">
                    <ProductCard
                      name={product.name}
                      safetyScore={product.safety_score}
                      category={product.category}
                      description={product.description}
                      onClick={() => onProductClick?.(product)}
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
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
