import { supabase } from '../supabase'

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category')
    .order('name')

  if (error) throw new Error(error.message)
  return data
}

export async function searchProducts(query) {
  const term = query.trim()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${term}%,brand.ilike.%${term}%,description.ilike.%${term}%`)
    .order('category')
    .order('name')

  if (error) throw new Error(error.message)
  return data
}
