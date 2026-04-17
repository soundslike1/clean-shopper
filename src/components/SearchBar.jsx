import Button from './Button'

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search products…',
  isLoading = false,
}) {
  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 bg-neutral-100 text-body text-neutral-900 placeholder:text-neutral-400 rounded-md px-md py-sm border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <Button variant="primary" type="submit" isLoading={isLoading}>
        Search
      </Button>
    </form>
  )
}
