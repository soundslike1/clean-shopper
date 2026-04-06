const VARIANT_CONFIG = {
  success: {
    containerClass: 'bg-success text-neutral-50 shadow-sm',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  warning: {
    containerClass: 'bg-warning text-neutral-50 shadow-sm',
    iconPath: 'M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
  },
  error: {
    containerClass: 'bg-error text-neutral-50 shadow-sm',
    iconPath: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
}

export default function NotificationBanner({ variant = 'success', message, onDismiss }) {
  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.success

  return (
    <div
      role="alert"
      className={`
        ${config.containerClass}
        flex items-center justify-between
        rounded-md
        px-lg py-md
        gap-sm
      `}
    >
      <div className="flex items-center gap-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 w-md h-md"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={config.iconPath} />
        </svg>
        <p className="text-small font-medium">{message}</p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-sm h-sm"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
