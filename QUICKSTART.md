# ⚡ Quick Start Guide - 5 Minutes

Get Ethereal Commerce running in 5 minutes.

---

## Prerequisites ✓

- Node.js 18+
- PostgreSQL installed and running
- Terminal/Command Prompt

---

## Step 1: Database Setup (1 min)

### Create database
```bash
createdb ethereal_commerce
```

Or via PostgreSQL GUI:
```sql
CREATE DATABASE ethereal_commerce;
```

---

## Step 2: Backend Setup (2 min)

### Terminal 1 - Backend
```bash
cd backend

# Setup environment
cp .env.example .env

# Edit .env - Change DATABASE_URL password if needed
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ethereal_commerce"

# Install & setup
npm install
npm run db:push
npm run db:seed

# Start server
npm run dev
```

✅ Backend running on http://localhost:3000

---

## Step 3: Frontend Setup (1 min)

### Terminal 2 - Frontend
```bash
# Copy environment
cp .env.example .env.local

# Install & start
npm install
npm run dev
```

✅ Frontend running on http://localhost:5173

---

## Step 4: Access the App (1 min)

### 🏪 Customer Store
**http://localhost:5173**
- Browse products
- Add to cart
- Checkout (demo)

### 👨‍💼 Admin Dashboard
**http://localhost:5173/admin**
- Dashboard
- Products
- Orders
- Users

### 🔌 API
**http://localhost:3000/api**
- Health: /health
- Products: /products
- Orders: /orders
- Auth: /auth

---

## Test It Out

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "Test123!"
  }'
```

### Get Products
```bash
curl http://localhost:3000/api/products
```

### View Database
```bash
cd backend
npm run db:studio
# Opens http://localhost:5555
```

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check PostgreSQL is running
# Windows: Task Manager > Services > PostgreSQL
# Mac: brew services list

# Check port 3000 is free
netstat -ano | findstr :3000

# Regenerate Prisma
cd backend && npm run db:generate
```

### Frontend not connecting to API
```bash
# Check backend is running
curl http://localhost:3000/api/health

# Check .env.local has correct API URL
# Should be: VITE_API_URL=http://localhost:3000/api
```

### Database errors
```bash
cd backend

# Reset database
npm run db:push

# Reseed data
npm run db:seed

# View database
npm run db:studio
```

---

## 📁 File Structure

```
ethereal-commerce/
├── backend/          ← Express API (run: npm run dev)
├── src/              ← Frontend React (run: npm run dev)
├── SETUP.md          ← Detailed setup guide
├── API_REFERENCE.md  ← All API endpoints
└── IMPLEMENTATION_SUMMARY.md ← What's been built
```

---

## 🚀 Next Steps

1. ✅ Backend running (http://localhost:3000)
2. ✅ Frontend running (http://localhost:5173)
3. 👉 **Now:** Connect frontend to backend
4. 👉 **Then:** Add real authentication
5. 👉 **Then:** Integrate payments (Stripe)

---

## 📚 Full Documentation

- **Setup:** `SETUP.md` - Complete setup with all options
- **API:** `API_REFERENCE.md` - All endpoints with examples
- **Summary:** `IMPLEMENTATION_SUMMARY.md` - What's been built
- **Backend:** `backend/README.md` - Backend-specific docs

---

## 💡 Quick Tips

- **Debug API:** Use http://localhost:3000/api/health
- **View DB:** Run `cd backend && npm run db:studio`
- **Check logs:** Look at terminal output for errors
- **Test API:** Use curl, Postman, or Thunder Client
- **Restart server:** Ctrl+C then `npm run dev`

---

## ✨ You're Ready!

Your Ethereal Commerce development environment is now set up!

**Next:** Read `SETUP.md` for detailed information or start building! 🎉
