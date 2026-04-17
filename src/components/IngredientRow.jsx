import IngredientBadge from './IngredientBadge'

export default function IngredientRow({ name, rating, note }) {
  return (
    <li className="flex flex-col gap-xs py-md border-b border-neutral-200 last:border-none">
      <div className="flex items-center justify-between gap-sm">
        <span className="text-h4 text-neutral-900">{name}</span>
        <IngredientBadge rating={rating} />
      </div>
      <p className="text-body text-neutral-600">{note}</p>
    </li>
  )
}
