const NAV_LINKS = [
  { label: 'Search',        route: '/search' },
  { label: 'My Library',    route: '/library' },
  { label: 'Shopping List', route: '/list' },
]

export default function NavBar({ activeRoute, onNavigate, onSignOut }) {
  return (
    <nav className="
      bg-neutral-100
      border-b border-neutral-200
      px-lg py-md
      flex items-center justify-between
      shadow-sm
    ">
      <span className="text-h4 font-medium text-primary">
        Clean Shopper
      </span>

      <ul className="flex items-center gap-lg list-none">
        {NAV_LINKS.map(({ label, route }) => {
          const isActive = activeRoute === route
          return (
            <li key={route}>
              <a
                href={route}
                onClick={(e) => { e.preventDefault(); onNavigate?.(route) }}
                className={`
                  text-small transition-colors duration-150
                  ${isActive
                    ? 'text-primary font-medium border-b-2 border-primary pb-xs'
                    : 'text-neutral-600 hover:text-primary'
                  }
                `}
              >
                {label}
              </a>
            </li>
          )
        })}

        {onSignOut && (
          <li>
            <button
              type="button"
              onClick={onSignOut}
              className="text-small text-neutral-600 hover:text-primary transition-colors duration-150"
            >
              Sign out
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
