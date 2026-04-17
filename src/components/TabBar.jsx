export default function TabBar({ tabs, activeTab, onChange }) {
  return (
    <div className="flex border-b border-neutral-200">
      {tabs.map(({ label, value }) => {
        const isActive = activeTab === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`
              px-md py-sm text-small transition-colors duration-150
              ${isActive
                ? 'text-primary font-medium border-b-2 border-primary -mb-px'
                : 'text-neutral-600 hover:text-primary'
              }
            `}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
