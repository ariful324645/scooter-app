"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useSession, signOut } from "next-auth/react"

// Products page component
export default function ProductsPage() {
  const { data: session } = useSession()
  // State for products data
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch products when component mounts
    fetchProducts()
  }, [])

  // Function to get products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.log("Error:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <p style={{ color: "#666", fontSize: "18px" }}>Loading...</p>
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
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              {session ? (
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                  <Link href="/dashboard/add-product" className="btn">
                    Add Product
                  </Link>
                  <span style={{ color: "#666", fontSize: "14px" }}>
                    Hi, {session.user?.name || session.user?.email}
                  </span>
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
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ fontSize: "36px", marginBottom: "50px", textAlign: "center", color: "#dc2626" }}
        >
          All Electric Scooters
        </motion.h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "30px" }}>
          {products.map((product, index) => (
            <motion.div
              key={product._id || index}
              className="product-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -8 }}
              style={{ position: "relative", overflow: "hidden" }}
            >
              {/* Product Image Placeholder */}
              <div style={{ 
                height: "220px", 
                background: "linear-gradient(135deg, #fef2f2 0%, #f9f9f9 100%)", 
                borderRadius: "6px", 
                marginBottom: "20px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "24px",
                border: "1px solid #fef2f2",
                fontWeight: "bold",
                color: "#dc2626"
              }}>
                SCOOTER IMAGE
              </div>
              
              <h3 style={{ fontSize: "22px", marginBottom: "12px", color: "#dc2626", fontWeight: "600" }}>
                {product.name}
              </h3>
              
              <p style={{ marginBottom: "20px", color: "#666", lineHeight: "1.6", height: "48px", overflow: "hidden" }}>
                {product.description}
              </p>
              
              {/* Specs */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "14px" }}>
                  {product.range && <span style={{ color: "#666" }}>Range: <strong>{product.range}</strong></span>}
                  {product.maxSpeed && <span style={{ color: "#666" }}>Speed: <strong>{product.maxSpeed}</strong></span>}
                  {product.weight && <span style={{ color: "#666" }}>Weight: <strong>{product.weight}</strong></span>}
                  {product.battery && <span style={{ color: "#666" }}>Battery: <strong>{product.battery}</strong></span>}
                </div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626" }}>
                  ${product.price}
                </p>
                <span style={{ 
                  background: "#dc2626", 
                  color: "white", 
                  padding: "4px 12px", 
                  borderRadius: "20px", 
                  fontSize: "12px",
                  fontWeight: "500"
                }}>
                  Electric
                </span>
              </div>
              
              <Link
                href={`/products/${product._id || index}`}
                className="btn btn-primary"
                style={{ width: "100%", textAlign: "center", padding: "12px" }}
              >
                View Details →
              </Link>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", marginTop: "80px" }}
          >
            <div style={{ fontSize: "24px", marginBottom: "20px", color: "#dc2626", fontWeight: "bold" }}>No Scooters Found</div>
            <p style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
              No scooters available yet. Check back soon!
            </p>
            <Link href="/dashboard/add-product" className="btn btn-primary">
              Add First Scooter
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
