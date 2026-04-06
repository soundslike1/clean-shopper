const SCORE_CONFIG = {
  clean:   { label: 'Clean',   className: 'bg-success' },
  caution: { label: 'Caution', className: 'bg-warning' },
  avoid:   { label: 'Avoid',   className: 'bg-error'   },
}

const SIZE_CONFIG = {
  sm: 'text-micro px-sm py-xs',
  md: 'text-small px-md py-sm',
}

export default function SafetyBadge({ score, size = 'md' }) {
  const scoreConfig = SCORE_CONFIG[score] ?? SCORE_CONFIG.caution
  const sizeClass = SIZE_CONFIG[size] ?? SIZE_CONFIG.md

  return (
    <span className={`
      ${scoreConfig.className}
      ${sizeClass}
      text-neutral-50 font-medium
      rounded-sm
    `}>
      {scoreConfig.label}
    </span>
  )
}
