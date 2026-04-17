import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { signOut } from './lib/api/auth'
import NavBar from './components/NavBar'
import SignUpPage from './features/auth/SignUpPage'
import SignInPage from './features/auth/SignInPage'
import BrowsePage from './features/browse/BrowsePage'
import SearchPage from './features/search/SearchPage'
import ShoppingListPage from './features/list/ShoppingListPage'
import LibraryPage from './features/library/LibraryPage'
import ProductDetailPage from './features/product/ProductDetailPage'

export default function App() {
  const [page, setPage] = useState(null)
  const [route, setRoute] = useState('/')
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setPage(session ? 'app' : 'signin')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') setPage('app')
      if (event === 'SIGNED_OUT') { setPage('signin'); setRoute('/'); setSelectedProduct(null) }
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

  if (selectedProduct) {
    return (
      <>
        <NavBar activeRoute={route} onNavigate={setRoute} onSignOut={signOut} />
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      </>
    )
  }

  return (
    <>
      <NavBar activeRoute={route} onNavigate={setRoute} onSignOut={signOut} />
      {route === '/search'  && <SearchPage  onProductClick={setSelectedProduct} />}
      {route === '/list'    && <ShoppingListPage onProductClick={setSelectedProduct} />}
      {route === '/library' && <LibraryPage onProductClick={setSelectedProduct} />}
      {route !== '/search' && route !== '/list' && route !== '/library' && (
        <BrowsePage onProductClick={setSelectedProduct} />
      )}
    </>
  )
}
