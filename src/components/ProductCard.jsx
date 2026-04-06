import SafetyBadge from './SafetyBadge'
import CategoryTag from './CategoryTag'

export default function ProductCard({ name, safetyScore, category, description, onClick }) {
  return (
    <article
      onClick={onClick}
      className="
        bg-secondary
        rounded-lg
        shadow-sm hover:shadow-md
        p-lg
        flex flex-col gap-sm
        transition-shadow duration-200
        cursor-pointer
      "
    >
      <header className="flex items-start justify-between gap-sm">
        <h3 className="text-h3 text-neutral-900">
          {name}
        </h3>
        <SafetyBadge score={safetyScore} size="sm" />
      </header>

      <CategoryTag label={category} />

      <p className="text-body text-neutral-600">
        {description}
      </p>
    </article>
  )
}
