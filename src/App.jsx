import ProductCard from './components/ProductCard'

const PLACEHOLDER_PRODUCTS = [
  {
    name: 'Honest Company Shampoo + Body Wash',
    safetyScore: 'clean',
    category: 'Personal Care',
    description: 'Gentle, plant-based formula with no synthetic fragrance, parabens, or sulfates. EWG verified.',
  },
  {
    name: 'Seventh Generation Dish Liquid',
    safetyScore: 'caution',
    category: 'Household Cleaning',
    description: 'Plant-derived cleaning agents, but contains a preservative flagged at moderate concern by EWG.',
  },
  {
    name: 'Febreze Air Freshener',
    safetyScore: 'avoid',
    category: 'Air Care',
    description: 'Contains undisclosed fragrance ingredients, acetaldehyde, and BHT. High EWG concern rating.',
  },
]

export default function App() {
  return (
    <main className="min-h-screen bg-neutral-50 px-lg py-xl">
      <h1 className="text-h1 text-neutral-900 mb-xl">Clean Shopper</h1>
      <div className="flex flex-col gap-md max-w-md">
        {PLACEHOLDER_PRODUCTS.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            safetyScore={product.safetyScore}
            category={product.category}
            description={product.description}
            onClick={() => console.log('clicked:', product.name)}
          />
        ))}
      </div>
    </main>
  )
}
