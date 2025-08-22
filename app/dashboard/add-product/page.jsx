"use client"
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

// Page to add new products - only for logged in users
export default function AddProductPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    range: "",
    maxSpeed: "",
    weight: "",
    battery: "",
  })

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) {
      router.push("/login")
    }
  }, [session, status, router])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Success message
        alert("Product added successfully!")
        
        setFormData({
          name: "",
          description: "",
          price: "",
          range: "",
          maxSpeed: "",
          weight: "",
          battery: "",
        })
        router.push("/products")
      } else {
        alert("Error adding product")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error adding product")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#666", fontSize: "18px" }}>Loading...</p>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to login
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
              <Link href="/products" className="btn">
                Products
              </Link>
              <span style={{ color: "#666", fontSize: "14px" }}>Welcome, {session.user?.name || session.user?.email}</span>
              <button 
                onClick={() => signOut()} 
                className="btn"
                style={{ fontSize: "14px", padding: "8px 15px" }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: "40px 20px" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <h1 style={{ fontSize: "32px", marginBottom: "30px", textAlign: "center", color: "#dc2626" }}>Add New Electric Scooter</h1>

          <form
            onSubmit={handleSubmit}
            style={{
              border: "2px solid #dc2626",
              padding: "30px",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 16px rgba(220, 38, 38, 0.1)",
            }}
          >
            <div className="form-group">
              <label>Product Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Price ($):</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label>Range (km):</label>
              <input
                type="text"
                name="range"
                value={formData.range}
                onChange={handleInputChange}
                placeholder="e.g., 25km"
              />
            </div>

            <div className="form-group">
              <label>Max Speed:</label>
              <input
                type="text"
                name="maxSpeed"
                value={formData.maxSpeed}
                onChange={handleInputChange}
                placeholder="e.g., 25 km/h"
              />
            </div>

            <div className="form-group">
              <label>Weight:</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="e.g., 12kg"
              />
            </div>

            <div className="form-group">
              <label>Battery Type:</label>
              <input
                type="text"
                name="battery"
                value={formData.battery}
                onChange={handleInputChange}
                placeholder="e.g., Lithium-ion"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
