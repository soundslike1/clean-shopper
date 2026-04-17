import SafetyBadge from '../../components/SafetyBadge'
import CategoryTag from '../../components/CategoryTag'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'
import IngredientRow from '../../components/IngredientRow'

const PLACEHOLDER_INGREDIENTS = [
  {
    name: 'Water',
    rating: 'safe',
    note: 'The universal solvent and base for most formulas. No safety concerns at any concentration.',
  },
  {
    name: 'Glycerin',
    rating: 'safe',
    note: 'A plant-derived humectant that draws moisture into the skin. Well-tolerated by all skin types including sensitive.',
  },
  {
    name: 'Cocamidopropyl Betaine',
    rating: 'caution',
    note: 'A mild surfactant derived from coconut oil. Generally well-tolerated but can cause contact dermatitis in some individuals.',
  },
  {
    name: 'Sodium Lauryl Sulfate',
    rating: 'avoid',
    note: 'A strong surfactant that creates rich lather but strips natural oils and disrupts the skin barrier. Linked to irritation with repeated use.',
  },
  {
    name: 'Aloe Barbadensis Leaf Juice',
    rating: 'safe',
    note: 'Aloe vera extract with clinically recognized soothing and anti-inflammatory properties. No safety concerns.',
  },
  {
    name: 'Fragrance',
    rating: 'caution',
    note: 'A catch-all term that can represent hundreds of undisclosed chemicals. A common trigger for skin sensitization and respiratory reactions.',
  },
  {
    name: 'Methylisothiazolinone',
    rating: 'avoid',
    note: 'A preservative classified as a skin sensitizer by the EU Scientific Committee. Restricted in leave-on products and flagged by EWG.',
  },
  {
    name: 'Sodium Chloride',
    rating: 'safe',
    note: 'Common salt used to adjust viscosity and texture. No safety concerns at concentrations used in personal care.',
  },
]

export default function ProductDetailPage({ product, onBack }) {
  const ingredients = PLACEHOLDER_INGREDIENTS

  return (
    <main className="min-h-screen bg-neutral-50 px-lg py-xl">
      <div className="max-w-2xl mx-auto flex flex-col gap-xl">

        <Button variant="secondary" onClick={onBack}>← Back</Button>

        <header className="flex flex-col gap-sm">
          <div className="flex items-start justify-between gap-sm">
            <h1 className="text-h1 font-serif text-neutral-900">{product.name}</h1>
            <SafetyBadge score={product.safety_score} size="md" />
          </div>
          <CategoryTag label={product.category} />
          <p className="text-body text-neutral-600">{product.description}</p>
        </header>

        <section>
          <h2 className="text-h2 font-serif text-neutral-900 mb-md">Ingredients</h2>
          {ingredients.length === 0 ? (
            <EmptyState
              heading="No ingredient data"
              body="We don't have ingredient information for this product yet."
            />
          ) : (
            <ul className="list-none">
              {ingredients.map((ingredient) => (
                <IngredientRow
                  key={ingredient.name}
                  name={ingredient.name}
                  rating={ingredient.rating}
                  note={ingredient.note}
                />
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}
