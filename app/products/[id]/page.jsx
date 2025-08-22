"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

export default function ProductDetailsPage() {
  const { data: session } = useSession()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        console.error("Product not found")
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#666", fontSize: "18px" }}>Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: "center" }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#dc2626" }}>Scooter Not Found</h1>
          <Link href="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      {/* Beautiful navbar */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" style={{ fontSize: "24px", fontWeight: "bold", textDecoration: "none", color: "#dc2626" }}>
              ScooterShop
            </Link>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <Link href="/products" className="btn">
                ← Back to Products
              </Link>
              {session ? (
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                  <Link href="/dashboard/add-product" className="btn">
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => signOut()} 
                    className="btn"
                    style={{ fontSize: "14px", padding: "8px 15px" }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" className="btn">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: "40px 20px" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "start" }}>
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div style={{ 
                height: "400px", 
                background: "linear-gradient(135deg, #fef2f2 0%, #f9f9f9 100%)", 
                borderRadius: "8px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "32px",
                border: "2px solid #dc2626",
                marginBottom: "20px",
                fontWeight: "bold",
                color: "#dc2626"
              }}>
                PRODUCT IMAGE
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                <div style={{ height: "80px", background: "#f9f9f9", borderRadius: "4px", border: "1px solid #dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#dc2626" }}>IMG1</div>
                <div style={{ height: "80px", background: "#f9f9f9", borderRadius: "4px", border: "1px solid #dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#dc2626" }}>IMG2</div>
                <div style={{ height: "80px", background: "#f9f9f9", borderRadius: "4px", border: "1px solid #dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#dc2626" }}>IMG3</div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 style={{ fontSize: "36px", marginBottom: "20px", color: "#dc2626" }}>{product.name}</h1>
              
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626", marginBottom: "20px" }}>
                ${product.price}
              </p>

              <p style={{ fontSize: "16px", marginBottom: "30px", lineHeight: "1.7", color: "#666" }}>
                {product.description}
              </p>

              <div style={{ 
                border: "1px solid #dc2626", 
                borderRadius: "8px", 
                padding: "20px", 
                marginBottom: "30px",
                background: "#fef2f2"
              }}>
                <h3 style={{ fontSize: "20px", marginBottom: "15px", color: "#dc2626" }}>Specifications</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <strong style={{ color: "#dc2626" }}>Range:</strong>
                    <br />
                    <span style={{ color: "#666" }}>{product.range || "25km"}</span>
                  </div>
                  <div>
                    <strong style={{ color: "#dc2626" }}>Max Speed:</strong>
                    <br />
                    <span style={{ color: "#666" }}>{product.maxSpeed || "25 km/h"}</span>
                  </div>
                  <div>
                    <strong style={{ color: "#dc2626" }}>Weight:</strong>
                    <br />
                    <span style={{ color: "#666" }}>{product.weight || "12kg"}</span>
                  </div>
                  <div>
                    <strong style={{ color: "#dc2626" }}>Battery:</strong>
                    <br />
                    <span style={{ color: "#666" }}>{product.battery || "Lithium-ion"}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: "1", fontSize: "16px", padding: "15px" }}
                  onClick={() => alert("Add to Cart feature coming soon!")}
                >
                  Add to Cart
                </button>
                <button 
                  className="btn" 
                  style={{ padding: "15px 20px" }}
                  onClick={() => alert("Buy Now feature coming soon!")}
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: "80px" }}
          >
            <h3 style={{ fontSize: "28px", marginBottom: "30px", color: "#dc2626" }}>You might also like</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              <div className="product-card">
                <div style={{ height: "150px", background: "#f9f9f9", borderRadius: "6px", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#dc2626" }}>
                  SCOOTER
                </div>
                <h4 style={{ color: "#dc2626", marginBottom: "8px" }}>Urban Rider Pro</h4>
                <p style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>Perfect for city commuting</p>
                <p style={{ fontWeight: "bold", color: "#dc2626" }}>$599</p>
              </div>
              <div className="product-card">
                <div style={{ height: "150px", background: "#f9f9f9", borderRadius: "6px", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#dc2626" }}>
                  FAST SCOOTER
                </div>
                <h4 style={{ color: "#dc2626", marginBottom: "8px" }}>Speed Demon X</h4>
                <p style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>High-performance scooter</p>
                <p style={{ fontWeight: "bold", color: "#dc2626" }}>$899</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
