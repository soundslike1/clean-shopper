import { useState } from 'react'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { signIn } from '../../lib/api/auth'

export default function SignInPage({ onNavigateToSignUp, onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')
    setFormError('')

    let hasError = false
    if (!email) {
      setEmailError('Email is required.')
      hasError = true
    }
    if (!password) {
      setPasswordError('Password is required.')
      hasError = true
    }
    if (hasError) return

    setIsLoading(true)
    try {
      await signIn(email, password)
      onSuccess()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-md">
      <div className="w-full max-w-md bg-secondary rounded-lg shadow-md p-xl sm:p-2xl flex flex-col gap-lg">
        <header className="flex flex-col gap-xs">
          <h1 className="text-h2 font-serif text-neutral-900">Welcome back</h1>
          <p className="text-body text-neutral-600">Sign in to your Clean Shopper account.</p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-md">
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={emailError}
            disabled={isLoading}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Your password"
            error={passwordError}
            disabled={isLoading}
          />

          {formError && (
            <p className="text-small text-error">{formError}</p>
          )}

          <Button type="submit" variant="primary" isLoading={isLoading}>
            Sign in
          </Button>
        </form>

        <p className="text-small text-neutral-600 text-center">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToSignUp}
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </main>
  )
}
