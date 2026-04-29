# 🚀 Ethereal Commerce - Complete Setup Guide

## Project Structure

The project is now split into two parts:

```
ethereal-commerce/
├── frontend/          (src/ - React app)
│   ├── src/
│   ├── vite.config.ts
│   └── package.json
│
└── backend/          (Express API)
    ├── src/
    ├── prisma/
    └── package.json
```

---

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/))
- **Bun** (optional, for frontend) - `npm install -g bun`
- **Git** for version control

---

## 🔧 Database Setup

### 1. Create PostgreSQL Database

Open PostgreSQL command line (psql):

```bash
psql -U postgres
```

Create the database:

```sql
CREATE DATABASE ethereal_commerce;
```

Exit:

```sql
\q
```

---

## 📦 Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy and edit `.env`:

```bash
cp .env.example .env
```

**Edit `.env`:**

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ethereal_commerce"
JWT_SECRET="your-super-secret-key-change-in-production"
JWT_EXPIRY="7d"
PORT=3000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
STRIPE_SECRET_KEY="sk_test_your_key"
```

⚠️ **Replace:**
- `password` with your PostgreSQL password
- `JWT_SECRET` with a strong secret
- Stripe keys when you have them

### 3. Setup Database

Generate Prisma client:

```bash
npm run db:generate
```

Create tables:

```bash
npm run db:push
```

Seed sample data:

```bash
npm run db:seed
```

### 4. Start Backend Server

```bash
npm run dev
```

✅ Server will run on: **http://localhost:3000**

Backend should show:
```
✅ Server running on http://localhost:3000
📝 Environment: development
```

---

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
# From project root
npm install
# or with bun
bun install
```

### 2. Configure Environment

Create `.env.local`:

```bash
cp .env.example .env.local
```

Default is already set to:
```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Start Development Server

```bash
npm run dev
# or with bun
bun run dev
```

✅ Frontend will run on: **http://localhost:5173**

---

## ✨ Access the Application

### Customer Store
- **URL:** http://localhost:5173
- **Features:**
  - Browse products
  - Add to cart
  - Checkout (demo)
  - Create account
  - View orders

### Admin Dashboard
- **URL:** http://localhost:5173/admin
- **Access:** Login as admin (or create admin account)
- **Features:**
  - Dashboard stats
  - Product management
  - Order management
  - User management

### API Documentation
- **Base URL:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/api/health

---

## 🧪 Testing API Endpoints

### Register User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Products

```bash
curl http://localhost:3000/api/products
```

### Get Products with Filtering

```bash
curl "http://localhost:3000/api/products?category=Audio&sort=price-asc"
```

---

## 🗄️ Database Management

### Open Prisma Studio (Visual DB Editor)

```bash
cd backend
npm run db:studio
```

Opens at: **http://localhost:5555**

### View Database Migrations

```bash
cd backend
npm run db:migrate
```

### Reset Database

```bash
cd backend
npm run db:push
```

---

## 📊 Project Commands

### Frontend Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code
```

### Backend Commands

```bash
npm run dev               # Start dev server
npm run build            # Build TypeScript
npm run start            # Start production server
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:push          # Push schema to DB
npm run db:studio        # Open Prisma Studio
npm run lint             # Run ESLint
npm run format           # Format code
```

---

## 🔐 Authentication Flow

1. **Register:** User creates account at `/account` (signup tab)
2. **Login:** User logs in, receives JWT token
3. **Token Storage:** Token stored in localStorage
4. **Protected Routes:** Token sent in `Authorization: Bearer <token>` header
5. **Admin Access:** Only users with `ADMIN` role can access `/admin`

---

## 🛠️ Common Issues & Solutions

### Issue: "Could not connect to database"

**Solution:**
```bash
# Check PostgreSQL is running
# Windows: Services > PostgreSQL
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Verify DATABASE_URL in .env
# Format: postgresql://user:password@host:port/database
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Change PORT in backend/.env
PORT=3001

# Or kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

### Issue: "Module not found" in backend

**Solution:**
```bash
cd backend
npm install
npm run db:generate
```

### Issue: Frontend API calls failing

**Solution:**
```bash
# 1. Check backend is running
curl http://localhost:3000/api/health

# 2. Check CORS_ORIGIN in backend/.env matches frontend URL
# Should be: http://localhost:5173

# 3. Check VITE_API_URL in frontend/.env.local
# Should be: http://localhost:3000/api
```

---

## 📈 Development Workflow

### Daily Development

1. **Start PostgreSQL**
   ```bash
   # Windows: Services or docker
   # Mac: brew services start postgresql
   ```

2. **Start Backend** (in one terminal)
   ```bash
   cd backend && npm run dev
   ```

3. **Start Frontend** (in another terminal)
   ```bash
   npm run dev
   ```

4. **Open Prisma Studio** (optional, in third terminal)
   ```bash
   cd backend && npm run db:studio
   ```

### Making Database Changes

```bash
# 1. Update schema in backend/prisma/schema.prisma
# 2. Create migration
npm run db:migrate

# 3. Or just push changes
npm run db:push

# 4. Frontend uses existing API, no changes needed
```

### Testing API Changes

Use Postman, Thunder Client, or curl to test endpoints before connecting frontend.

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

```bash
# Connect to Vercel
npm i -g vercel
vercel

# Configure environment variables in Vercel dashboard
VITE_API_URL=https://api.yourdomain.com/api
```

### Backend Deployment (Railway or Render)

1. Push code to GitHub
2. Connect repository to Railway/Render
3. Set environment variables
4. Deploy

---

## 📚 Next Steps

1. ✅ Backend API running
2. ✅ Admin dashboard ready
3. 🔜 Connect frontend to backend
4. 🔜 Implement real authentication
5. 🔜 Add payment processing
6. 🔜 Deploy to production

---

## 📞 Need Help?

- **Backend Issues:** Check `backend/README.md`
- **Frontend Issues:** Check project README
- **Database Issues:** Run `npm run db:studio`
- **API Issues:** Test with curl or Postman first

---

## ✅ Verification Checklist

- [ ] PostgreSQL running
- [ ] Backend `.env` configured
- [ ] Backend migrations run
- [ ] Backend server started (port 3000)
- [ ] Frontend `.env.local` configured
- [ ] Frontend server started (port 5173)
- [ ] Can access http://localhost:5173
- [ ] Can access http://localhost:3000/api/health
- [ ] Can register/login user
- [ ] Can browse products

---

## 🎉 You're Ready!

Your Ethereal Commerce stack is now ready for development!

**Frontend:** http://localhost:5173  
**Admin:** http://localhost:5173/admin  
**API:** http://localhost:3000/api  
**Prisma Studio:** http://localhost:5555
