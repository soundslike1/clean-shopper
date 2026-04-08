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
