"use client"
import { signIn, getSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

// Login page with tabs for login/register
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    getSession().then((session) => {
      if (session) {
        router.push("/products")
      }
    })
  }, [router])

  const handleCredentialsLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      router.push("/products")
    } else {
      alert("Login failed")
    }
    setLoading(false)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    setLoading(true)

    // Simulate registration (in real app, you'd call an API)
    try {
      // For demo purposes, just sign them in after "registration"
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.ok) {
        alert("Registration successful! You're now logged in.")
        router.push("/products")
      } else {
        alert("Registration failed")
      }
    } catch (error) {
      alert("Registration failed")
    }
    setLoading(false)
  }

  const handleGoogleLogin = () => {
    signIn("google")
  }

  return (
    <div>
      {/* Simple navbar */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" style={{ fontSize: "24px", fontWeight: "bold", textDecoration: "none", color: "#dc2626" }}>
              ScooterShop
            </Link>
            <div style={{ display: "flex", gap: "20px" }}>
              <Link href="/products" className="btn">
                Products
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            border: "2px solid #dc2626",
            padding: "40px",
            width: "400px",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 16px rgba(220, 38, 38, 0.1)",
          }}
        >
          {/* Tab Buttons */}
          <div style={{ display: "flex", marginBottom: "30px", border: "1px solid #dc2626", borderRadius: "6px", overflow: "hidden" }}>
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                background: !isRegister ? "#dc2626" : "white",
                color: !isRegister ? "white" : "#dc2626",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                background: isRegister ? "#dc2626" : "white",
                color: isRegister ? "white" : "#dc2626",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Register
            </button>
          </div>

          <h1 style={{ fontSize: "24px", marginBottom: "30px", textAlign: "center", color: "#dc2626" }}>
            {isRegister ? "Join ScooterShop" : "Login to ScooterShop"}
          </h1>

          {isRegister ? (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name:</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="Create a password"
                />
              </div>

              <div className="form-group">
                <label>Confirm Password:</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginBottom: "15px" }}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCredentialsLogin}>
              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginBottom: "15px" }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          <div style={{ textAlign: "center", margin: "20px 0", color: "#666" }}>
            <p>or</p>
          </div>

          <button onClick={handleGoogleLogin} className="btn" style={{ width: "100%" }}>
            Continue with Google
          </button>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
            {isRegister ? "Already have an account? Click Login above" : "Use any email/password for demo login"}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
