import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'
import TabBar from '../../components/TabBar'
import { getSavedProducts, unsaveProduct } from '../../lib/api/saved-products'

const TABS = [
  { label: 'Food',   value: 'Food'   },
  { label: 'Beauty', value: 'Beauty' },
]

const CATEGORY_GROUPS = {
  Food: [
    'Food', 'Grocery', 'Food & Beverage', 'Food & Drink',
    'Beverages', 'Snacks', 'Pantry', 'Kitchen',
  ],
  Beauty: [
    'Beauty', 'Skin Care', 'Skincare', 'Personal Care',
    'Hair Care', 'Shampoo', 'Conditioner', 'Body Care',
    'Baby Care', 'Makeup', 'Cosmetics', 'Bath & Body',
    'Oral Care', 'Deodorant', 'Fragrance', 'Home Cleaning',
  ],
}

export default function LibraryPage({ onProductClick }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('Food')

  useEffect(() => {
    getSavedProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleRemove(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    try {
      await unsaveProduct(id)
    } catch {
      getSavedProducts().then(setProducts).catch(() => {})
    }
  }

  const visibleProducts = products.filter((p) =>
    CATEGORY_GROUPS[activeTab]?.includes(p.category)
  )

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-50 px-lg py-xl flex items-center justify-center">
        <p className="text-body text-neutral-600">Loading your library…</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-neutral-50 px-lg py-xl flex items-center justify-center">
        <p className="text-body text-error">Failed to load library: {error}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-lg py-xl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-h1 font-serif text-neutral-900 mb-xl">My Library</h1>

        <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-xl">
          {visibleProducts.length === 0 ? (
            <EmptyState
              heading={`No ${activeTab} products saved`}
              body="Save products from Browse or Search to see them here."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
              {visibleProducts.map((product) => (
                <div key={product.id} className="flex flex-col gap-sm">
                  <ProductCard
                    name={product.name}
                    safetyScore={product.safety_score}
                    category={product.category}
                    description={product.description}
                    onClick={() => onProductClick?.(product)}
                  />
                  <Button
                    variant="destructive"
                    onClick={() => handleRemove(product.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
