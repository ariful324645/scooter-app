import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase()

    // Handle both ObjectId and regular string IDs
    let product
    if (ObjectId.isValid(params.id)) {
      product = await db.collection("products").findOne({ _id: new ObjectId(params.id) })
    } else {
      // Fallback for hardcoded products or invalid IDs
      const products = await db.collection("products").find({}).toArray()
      product = products[Number.parseInt(params.id)] || null
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
