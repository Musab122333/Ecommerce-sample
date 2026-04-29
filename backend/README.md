# Backend - Ethereal Commerce API

REST API for the Ethereal Commerce e-commerce platform built with Express.js and PostgreSQL.

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## 🚀 Getting Started

### 1. Installation

\`\`\`bash
cd backend
npm install
\`\`\`

### 2. Environment Setup

Copy `.env.example` to `.env` and configure:

\`\`\`bash
cp .env.example .env
\`\`\`

Update the `.env` file with your values:

\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/ethereal_commerce"
JWT_SECRET="your-secret-key"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
STRIPE_SECRET_KEY="sk_test_..."
\`\`\`

### 3. Database Setup

Create the database and run migrations:

\`\`\`bash
npm run db:push
\`\`\`

Seed sample data:

\`\`\`bash
npm run db:seed
\`\`\`

### 4. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Server will run on `http://localhost:3000`

## 📂 Project Structure

\`\`\`
backend/
├── src/
│   ├── controllers/      # Business logic
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth, error handling
│   ├── utils/            # Helpers and utilities
│   ├── config.ts         # Configuration
│   └── index.ts          # Express app entry
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── package.json
├── tsconfig.json
└── .env.example
\`\`\`

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)

### Products

- `GET /api/products` - Get all products (pagination, filtering, search)
- `GET /api/products/:id` - Get product details
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (admin only)
- `PATCH /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders

- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get order details (requires auth)
- `PATCH /api/orders/:id/cancel` - Cancel order (requires auth)
- `GET /api/orders/admin/all` - Get all orders (admin only)
- `PATCH /api/orders/:id/status` - Update order status (admin only)

### Users

- `GET /api/users/profile` - Get user profile (requires auth)
- `PATCH /api/users/profile` - Update profile (requires auth)
- `GET /api/users/wishlist` - Get wishlist (requires auth)
- `POST /api/users/wishlist/:productId` - Add to wishlist (requires auth)
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist (requires auth)

### Admin

- `GET /api/admin/dashboard` - Dashboard stats (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/analytics/sales` - Sales analytics (admin only)
- `GET /api/admin/analytics/traffic` - Traffic analytics (admin only)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Register or login to get a token
2. Include token in Authorization header: `Authorization: Bearer <token>`
3. Token expires in 7 days by default

Example:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/auth/me
\`\`\`

## 🗄️ Database Schema

Key models:

- **User** - User accounts (CUSTOMER, ADMIN)
- **Product** - Product catalog
- **Order** - Customer orders
- **OrderItem** - Items in orders
- **Address** - Shipping/billing addresses
- **Review** - Product reviews
- **WishlistItem** - Favorited products
- **Category** - Product categories

See `prisma/schema.prisma` for complete schema.

## 🛠️ Available Commands

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
\`\`\`

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@localhost:5432/db |
| JWT_SECRET | Secret key for JWT signing | your-secret-key |
| JWT_EXPIRY | JWT expiration time | 7d |
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development, production |
| CORS_ORIGIN | Frontend URL for CORS | http://localhost:5173 |
| STRIPE_SECRET_KEY | Stripe API key | sk_test_... |

## 🚢 Deployment

### Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

### Recommended Hosting

- **Vercel** - Zero-config deployment
- **Railway.app** - Easy database + server
- **AWS EC2** - Full control
- **DigitalOcean** - Affordable VPS
- **Heroku** - Simple Git-based deployment

## 📦 Dependencies

- **express** - Web framework
- **prisma** - ORM
- **postgresql** - Database
- **jsonwebtoken** - JWT auth
- **bcryptjs** - Password hashing
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **stripe** - Payment processing
- **zod** - Data validation
- **typescript** - Type safety

## 🧪 Testing

Testing setup coming soon...

## 📋 TODO

- [ ] Add comprehensive error handling
- [ ] Implement rate limiting
- [ ] Add email notifications
- [ ] Implement webhook handling
- [ ] Add image upload handling
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add API documentation (Swagger)
- [ ] Implement caching strategy
- [ ] Add monitoring and logging

## 📄 License

MIT

## 👥 Support

For issues and questions, please create an issue in the main repository.
