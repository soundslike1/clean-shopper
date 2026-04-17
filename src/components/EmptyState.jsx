import Button from './Button'

export default function EmptyState({ heading, body, action }) {
  return (
    <div className="flex flex-col items-center text-center gap-md py-3xl px-lg">
      <p className="text-h3 text-neutral-900">{heading}</p>
      <p className="text-body text-neutral-600">{body}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
