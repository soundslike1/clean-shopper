import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import SignUpPage from './features/auth/SignUpPage'
import SignInPage from './features/auth/SignInPage'
import BrowsePage from './features/browse/BrowsePage'

export default function App() {
  const [page, setPage] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setPage(session ? 'app' : 'signin')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setPage(session ? 'app' : 'signin')
    })

    return () => subscription.unsubscribe()
  }, [])

  if (page === null) return null

  if (page === 'signup') {
    return (
      <SignUpPage
        onNavigateToSignIn={() => setPage('signin')}
        onSuccess={() => setPage('app')}
      />
    )
  }

  if (page === 'signin') {
    return (
      <SignInPage
        onNavigateToSignUp={() => setPage('signup')}
        onSuccess={() => setPage('app')}
      />
    )
  }

  return <BrowsePage />
}
