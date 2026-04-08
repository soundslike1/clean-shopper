export default function Button({
  variant = 'primary',
  type = 'button',
  isLoading = false,
  disabled = false,
  onClick,
  children,
}) {
  const base = 'text-small font-medium rounded-md px-md py-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:     'bg-primary text-neutral-50 hover:bg-primary-light active:bg-primary-dark',
    secondary:   'bg-transparent text-primary border border-primary hover:bg-secondary active:bg-neutral-200',
    destructive: 'bg-error text-neutral-50 hover:opacity-90 active:opacity-80',
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {isLoading ? <LoadingRing /> : children}
    </button>
  )
}

function LoadingRing() {
  return (
    <span className="inline-block w-sm h-sm border-2 border-current border-t-transparent rounded-full animate-spin" />
  )
}
