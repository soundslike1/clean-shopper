export default function InputField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  helperText,
  error,
  disabled = false,
}) {
  const inputBase =
    'bg-neutral-100 text-body text-neutral-900 placeholder:text-neutral-400 rounded-md px-md py-sm border focus:outline-none focus:ring-2 w-full disabled:opacity-50 disabled:cursor-not-allowed'
  const inputState = error
    ? 'border-error ring-2 ring-error'
    : 'border-neutral-200 focus:ring-primary'

  return (
    <div className="flex flex-col gap-xs">
      <label htmlFor={id} className={`text-h4 text-neutral-900${disabled ? ' opacity-50' : ''}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${inputBase} ${inputState}`}
      />
      {(helperText || error) && (
        <p className={`text-micro ${error ? 'text-error' : 'text-neutral-600'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}
