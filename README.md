# ScooterShop - Electric Scooter Store

A simple Next.js 15 application for browsing and managing electric scooters with basic authentication.

## Features

- **Landing Page**: Hero section with featured scooters
- **Product Catalog**: Browse all available electric scooters
- **Product Details**: View detailed information about each scooter
- **Authentication**: Login with Google or credentials using NextAuth
- **Protected Dashboard**: Add new products (requires authentication)
- **MongoDB Integration**: Store and retrieve product data

## Tech Stack

- Next.js 15 (App Router)
- NextAuth.js for authentication
- MongoDB for database
- Framer Motion for animations
- Tailwind CSS for styling (basic black/white theme)

## Setup Instructions

1. **Clone and Install**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment Variables**
   Create a `.env.local` file with:
   \`\`\`
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MONGODB_URI=your-mongodb-connection-string
   \`\`\`

3. **Database Setup**
   - Set up a MongoDB database
   - Run the seed script to add sample products:
   \`\`\`bash
   node scripts/seed-products.js
   \`\`\`

4. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## Route Summary

- `/` - Landing page with hero and featured products
- `/login` - Authentication page (Google OAuth + credentials)
- `/products` - Public product listing page
- `/products/[id]` - Public product details page
- `/dashboard/add-product` - Protected page to add new products (requires login)

## API Routes

- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Fetch single product
- `/api/auth/[...nextauth]` - NextAuth authentication endpoints

## Known Issues (Intentional)

- Basic styling with inconsistent spacing
- Simple error handling with alert() messages
- Hardcoded related products section
- No image upload functionality
- Basic form validation
- No cart functionality (button doesn't work)

## Authentication

- **Google OAuth**: Set up Google OAuth credentials
- **Credentials**: Use any email/password combination for demo purposes
- Protected routes automatically redirect to login page

## Database Schema

Products collection:
\`\`\`javascript
{
  name: String,
  description: String,
  price: Number,
  range: String,
  maxSpeed: String,
  weight: String,
  battery: String,
  createdAt: Date
}
