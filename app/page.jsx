"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

// My first Next.js app! 
export default function HomePage() {
  const { data: session } = useSession()
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626" }}
            >
              ScooterShop
            </motion.h1>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Link href="/products" className="btn">
                Products
              </Link>
              {session ? (
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                  <Link href="/dashboard/add-product" className="btn">
                    Dashboard
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

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: "56px", marginBottom: "20px", color: "#dc2626", fontWeight: "bold" }}
          >
            Ride the Future
          </motion.h2>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: "20px", marginBottom: "40px", color: "#666", maxWidth: "600px", margin: "0 auto 40px" }}
          >
            Premium electric scooters designed for urban adventures. Fast, reliable, and eco-friendly transportation for the modern rider.
          </motion.p>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <Link href="/products" className="btn btn-primary" style={{ fontSize: "18px", padding: "15px 30px" }}>
              Shop Scooters
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container">
          <h3 style={{ fontSize: "36px", textAlign: "center", marginBottom: "60px", color: "#dc2626" }}>
            Why Choose Electric?
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px" }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>E</div>
              <h4 style={{ fontSize: "20px", marginBottom: "15px", color: "#dc2626" }}>Eco-Friendly</h4>
              <p style={{ color: "#666" }}>Zero emissions, helping reduce your carbon footprint while getting around the city.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>$</div>
              <h4 style={{ fontSize: "20px", marginBottom: "15px", color: "#dc2626" }}>Cost Effective</h4>
              <p style={{ color: "#666" }}>Save money on gas, parking, and public transport with our affordable scooters.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>F</div>
              <h4 style={{ fontSize: "20px", marginBottom: "15px", color: "#dc2626" }}>Fast & Fun</h4>
              <p style={{ color: "#666" }}>Beat traffic and enjoy the ride with speeds up to 35km/h and smooth acceleration.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section style={{ padding: "80px 0", background: "#fef2f2" }}>
        <div className="container">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{ fontSize: "36px", textAlign: "center", marginBottom: "50px", color: "#dc2626" }}
          >
            Featured Scooters
          </motion.h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
            <motion.div 
              className="product-card" 
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div style={{ height: "200px", background: "#f9f9f9", borderRadius: "6px", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>
                SCOOTER
              </div>
              <h4 style={{ fontSize: "22px", marginBottom: "10px", color: "#dc2626" }}>Urban Rider Pro</h4>
              <p style={{ marginBottom: "15px", color: "#666", lineHeight: "1.5" }}>Perfect for city commuting with 25km range and LED safety lights</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold", color: "#dc2626" }}>$599</p>
                <span style={{ background: "#fef2f2", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", color: "#dc2626" }}>25km range</span>
              </div>
            </motion.div>
            <motion.div 
              className="product-card" 
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div style={{ height: "200px", background: "#f9f9f9", borderRadius: "6px", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                FAST SCOOTER
              </div>
              <h4 style={{ fontSize: "22px", marginBottom: "10px", color: "#dc2626" }}>Speed Demon X</h4>
              <p style={{ marginBottom: "15px", color: "#666", lineHeight: "1.5" }}>High-performance scooter with advanced suspension for thrill seekers</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold", color: "#dc2626" }}>$899</p>
                <span style={{ background: "#fef2f2", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", color: "#dc2626" }}>35km/h</span>
              </div>
            </motion.div>
            <motion.div 
              className="product-card" 
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div style={{ height: "200px", background: "#f9f9f9", borderRadius: "6px", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                ECO SCOOTER
              </div>
              <h4 style={{ fontSize: "22px", marginBottom: "10px", color: "#dc2626" }}>Eco Cruiser</h4>
              <p style={{ marginBottom: "15px", color: "#666", lineHeight: "1.5" }}>Solar-powered scooter for environmentally conscious riders</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold", color: "#dc2626" }}>$749</p>
                <span style={{ background: "#fef2f2", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", color: "#dc2626" }}>Solar powered</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 style={{ fontSize: "36px", color: "#dc2626", marginBottom: "10px" }}>10K+</h3>
              <p style={{ color: "#666" }}>Happy Riders</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 style={{ fontSize: "36px", color: "#dc2626", marginBottom: "10px" }}>50+</h3>
              <p style={{ color: "#666" }}>Scooter Models</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 style={{ fontSize: "36px", color: "#dc2626", marginBottom: "10px" }}>25km</h3>
              <p style={{ color: "#666" }}>Average Range</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 style={{ fontSize: "36px", color: "#dc2626", marginBottom: "10px" }}>24/7</h3>
              <p style={{ color: "#666" }}>Customer Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "80px 0", background: "#dc2626", color: "white", textAlign: "center" }}>
        <div className="container">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ fontSize: "36px", marginBottom: "20px" }}
          >
            Ready to Start Your Journey?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "18px", marginBottom: "30px", opacity: 0.9 }}
          >
            Join the electric revolution and transform your daily commute
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/products" 
              className="btn" 
              style={{ 
                fontSize: "18px", 
                padding: "15px 30px",
                background: "white",
                color: "#dc2626",
                border: "2px solid white"
              }}
            >
              Browse All Scooters
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px" }}>
            <div>
              <h4 style={{ fontSize: "18px", marginBottom: "15px", color: "#dc2626" }}>ScooterShop</h4>
              <p style={{ color: "#666", lineHeight: "1.6" }}>Your premier destination for high-quality electric scooters. Ride smart, ride electric.</p>
            </div>
            <div>
              <h4 style={{ fontSize: "18px", marginBottom: "15px", color: "#dc2626" }}>Quick Links</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Link href="/products" style={{ color: "#666", textDecoration: "none" }}>All Products</Link>
                <Link href="/login" style={{ color: "#666", textDecoration: "none" }}>Login</Link>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "18px", marginBottom: "15px", color: "#dc2626" }}>Contact</h4>
              <p style={{ color: "#666" }}>Email: info@scootershop.com</p>
              <p style={{ color: "#666" }}>Phone: (555) 123-RIDE</p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #dc2626" }}>
            <p style={{ color: "#666" }}>&copy; 2025 ScooterShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
