const CONFIG = {
  safe:    { label: 'Safe',    bg: 'bg-success' },
  caution: { label: 'Caution', bg: 'bg-warning' },
  avoid:   { label: 'Avoid',   bg: 'bg-error'   },
}

export default function IngredientBadge({ rating }) {
  const { label, bg } = CONFIG[rating] ?? CONFIG.caution
  return (
    <span className={`${bg} rounded-full text-micro font-medium text-neutral-50 px-sm py-xs`}>
      {label}
    </span>
  )
}
