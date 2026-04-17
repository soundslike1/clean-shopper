import { supabase } from '../supabase'

export async function getSavedProductIds() {
  const { data, error } = await supabase
    .from('saved_products')
    .select('product_id')
  if (error) throw new Error(error.message)
  return new Set(data.map((r) => r.product_id))
}

export async function saveProduct(productId) {
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase
    .from('saved_products')
    .insert({ user_id: user.id, product_id: productId })
  if (error) throw new Error(error.message)
}

export async function getSavedProducts() {
  const { data, error } = await supabase
    .from('saved_products')
    .select('product_id, products(id, name, category, description, safety_score)')
  if (error) throw new Error(error.message)
  return data.map((r) => r.products).filter(Boolean)
}

export async function unsaveProduct(productId) {
  const { error } = await supabase
    .from('saved_products')
    .delete()
    .eq('product_id', productId)
  if (error) throw new Error(error.message)
}
