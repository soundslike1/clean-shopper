import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
)

const products = [
  // Personal Care
  {
    name: "Pure-Castile Liquid Soap — Unscented",
    brand: "Dr. Bronner's",
    category: "Personal Care",
    safety_score: "clean",
    description: "USDA certified organic, fair trade ingredients. No synthetic preservatives, foaming agents, or detergents. Biodegradable and concentrated.",
  },
  {
    name: "Simply White Fluoride Toothpaste",
    brand: "Tom's of Maine",
    category: "Personal Care",
    safety_score: "clean",
    description: "No artificial colors, flavors, or preservatives. SLS-free formula with naturally derived silica for gentle whitening.",
  },
  {
    name: "Beeswax Lip Balm — Original",
    brand: "Burt's Bees",
    category: "Personal Care",
    safety_score: "clean",
    description: "99% natural origin. Conditioning beeswax, vitamin E, and peppermint oil. No parabens, phthalates, or petrolatum.",
  },
  {
    name: "Volumizing Shampoo — Cucumber & Mint",
    brand: "Native",
    category: "Personal Care",
    safety_score: "clean",
    description: "Sulfate-free, paraben-free. Naturally derived cleansers with no silicones or dyes. Color-safe formula.",
  },
  {
    name: "Daily Face Moisturizer SPF 30",
    brand: "Beautycounter",
    category: "Personal Care",
    safety_score: "clean",
    description: "Mineral sunscreen with zinc oxide. Free of over 1,800 questionable ingredients. Lightweight, non-greasy, fragrance-free.",
  },

  // Home Cleaning
  {
    name: "All-Purpose Cleaner — Free & Clear",
    brand: "Seventh Generation",
    category: "Home Cleaning",
    safety_score: "clean",
    description: "Plant-derived cleaning agents, no dyes or synthetic fragrance. USDA Certified Biobased. EPA Safer Choice certified.",
  },
  {
    name: "All-Purpose Cleaning Spray — French Lavender",
    brand: "Method",
    category: "Home Cleaning",
    safety_score: "clean",
    description: "Plant-based surfactants, biodegradable formula. No bleach, ammonia, or phosphates. Recyclable packaging.",
  },
  {
    name: "Concentrate — The Concentrate",
    brand: "Branch Basics",
    category: "Home Cleaning",
    safety_score: "clean",
    description: "One concentrate replaces all cleaners. EWG verified A rating. No fragrance, dyes, or preservatives. Safe for all surfaces.",
  },
  {
    name: "All-Purpose Cleaner — Clary Sage & Lime",
    brand: "Better Life",
    category: "Home Cleaning",
    safety_score: "clean",
    description: "Plant-derived, cruelty-free, and biodegradable. No VOCs, petroleum solvents, or synthetic fragrance. EPA Safer Choice.",
  },
  {
    name: "Toilet Bowl Cleaner — Pine",
    brand: "Ecover",
    category: "Home Cleaning",
    safety_score: "clean",
    description: "Plant and mineral based. Biodegradable surfactants, no chlorine bleach or phosphates. European Ecolabel certified.",
  },

  // Baby Care
  {
    name: "Baby Nourishing Lotion",
    brand: "Burt's Bees",
    category: "Baby Care",
    safety_score: "clean",
    description: "98.9% natural origin. Pediatrician tested, tear-free. No parabens, phthalates, SLS, or synthetic fragrance.",
  },
  {
    name: "Calm Shampoo & Body Wash",
    brand: "California Baby",
    category: "Baby Care",
    safety_score: "clean",
    description: "USDA certified organic botanicals. Fragrance-free, gluten-free, vegan. No sulfates, parabens, or artificial colors.",
  },
  {
    name: "Hydra Bébé Body Lotion",
    brand: "Mustela",
    category: "Baby Care",
    safety_score: "clean",
    description: "Dermatologically tested for newborns. 97% natural origin ingredients. Fragrance-free, hypoallergenic, no parabens.",
  },
  {
    name: "Baby Wash & Shampoo — Fragrance Free",
    brand: "Honest Company",
    category: "Baby Care",
    safety_score: "clean",
    description: "EWG verified. Plant-derived cleansers, no SLS, parabens, or synthetic fragrance. Dermatologist and pediatrician tested.",
  },
  {
    name: "Organic Baby Diaper Cream",
    brand: "Earth Mama",
    category: "Baby Care",
    safety_score: "clean",
    description: "USDA certified organic. Non-nano zinc oxide, calendula, and shea butter. No talc, parabens, phthalates, or synthetic fragrance.",
  },

  // Kitchen
  {
    name: "Dish Liquid — Free & Clear",
    brand: "Seventh Generation",
    category: "Kitchen",
    safety_score: "clean",
    description: "Plant-derived surfactants. No dyes, synthetic fragrance, or triclosan. USDA Certified Biobased, biodegradable formula.",
  },
  {
    name: "Dish Soap — Lavender + Clary Sage",
    brand: "Branch Basics",
    category: "Kitchen",
    safety_score: "clean",
    description: "Derived entirely from plants and minerals. No fragrance chemicals, dyes, or preservatives. EWG verified A rating.",
  },
  {
    name: "Dishwasher Tablets — Free & Clear",
    brand: "Ecover",
    category: "Kitchen",
    safety_score: "clean",
    description: "Plant and mineral based, phosphate-free. Biodegradable packaging. No chlorine bleach, synthetic fragrances, or optical brighteners.",
  },
  {
    name: "Dish Soap Concentrate — Lemon",
    brand: "Biokleen",
    category: "Kitchen",
    safety_score: "clean",
    description: "Plant-based surfactants and real citrus extract. No SLS, artificial fragrance, or dyes. Concentrated — one bottle lasts longer.",
  },
  {
    name: "Fruit & Veggie Wash",
    brand: "Better Life",
    category: "Kitchen",
    safety_score: "clean",
    description: "Plant-derived formula removes wax, pesticide residue, and surface contaminants. Fragrance-free, food-safe, no synthetic chemicals.",
  },
]

const { data, error } = await supabase.from('products').insert(products).select()

if (error) {
  console.error('Insert failed:', error.message)
  console.error('Details:', error.details ?? error.hint ?? '')
  process.exit(1)
}

console.log(`✅ Inserted ${data.length} products successfully.`)
