// Run this script to add some initial products to the database
import { connectToDatabase } from "../lib/mongodb.js"

const sampleProducts = [
  {
    name: "Urban Rider Pro",
    description:
      "Perfect for city commuting with excellent battery life and smooth ride quality. Features LED lights and a digital display.",
    price: 599,
    range: "25km",
    maxSpeed: "25 km/h",
    weight: "12kg",
    battery: "Lithium-ion",
    createdAt: new Date(),
  },
  {
    name: "Speed Demon X",
    description:
      "High-performance electric scooter designed for thrill seekers. Powerful motor and advanced suspension system.",
    price: 899,
    range: "35km",
    maxSpeed: "35 km/h",
    weight: "15kg",
    battery: "Lithium-ion Pro",
    createdAt: new Date(),
  },
  {
    name: "Eco Cruiser",
    description: "Environmentally friendly scooter with solar charging capability. Perfect for eco-conscious riders.",
    price: 749,
    range: "30km",
    maxSpeed: "20 km/h",
    weight: "11kg",
    battery: "Solar + Lithium-ion",
    createdAt: new Date(),
  },
  {
    name: "Compact Commuter",
    description: "Lightweight and foldable design perfect for daily commuting. Easy to carry and store.",
    price: 399,
    range: "20km",
    maxSpeed: "20 km/h",
    weight: "9kg",
    battery: "Lithium-ion",
    createdAt: new Date(),
  },
]

async function seedProducts() {
  try {
    const { db } = await connectToDatabase()

    // Clear existing products (optional)
    await db.collection("products").deleteMany({})

    // Insert sample products
    const result = await db.collection("products").insertMany(sampleProducts)

    console.log(`Successfully inserted ${result.insertedCount} products`)
    console.log("Sample products added to database!")

    process.exit(0)
  } catch (error) {
    console.error("Error seeding products:", error)
    process.exit(1)
  }
}

seedProducts()
