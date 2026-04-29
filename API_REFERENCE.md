# 🔌 API Reference Guide

Quick reference for all Ethereal Commerce API endpoints.

**Base URL:** `http://localhost:3000/api`

**Authentication:** Include token in header: `Authorization: Bearer <token>`

---

## 📊 Quick Stats

- **Total Endpoints:** 17+
- **Public Routes:** 4 (health, products listing, product detail, categories)
- **Authenticated Routes:** 11
- **Admin Routes:** 3+

---

## 🔓 Public Endpoints

### Health Check
```
GET /health
```
Returns: API status

---

## 🔑 Authentication

### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "SecurePassword123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGc..."
  }
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

Response: Same as register (returns token)

### Get Current User
```
GET /auth/me
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CUSTOMER",
    "createdAt": "2024-01-15T..."
  }
}
```

---

## 📦 Products

### Get All Products
```
GET /products
Query params:
  - category: string (optional) - Filter by category
  - search: string (optional) - Search products
  - sort: string (optional) - 'price-asc', 'price-desc', 'newest', 'rating'
  - skip: number (optional) - Pagination offset (default: 0)
  - take: number (optional) - Items per page (default: 12)
```

Example:
```bash
GET /products?category=Audio&sort=price-asc&take=10
```

Response:
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod-1",
        "name": "Aura Headphones",
        "price": 349,
        "category": "Audio",
        "image": "...",
        "rating": 4.9,
        "inStock": true
      }
    ],
    "total": 45,
    "pages": 5
  }
}
```

### Get Single Product
```
GET /products/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "prod-1",
    "name": "Aura Headphones",
    "description": "...",
    "price": 349,
    "originalPrice": 399,
    "category": "Audio",
    "rating": 4.9,
    "reviews": [...]
  }
}
```

### Get Categories
```
GET /products/categories
```

Response:
```json
{
  "success": true,
  "data": [
    "Audio",
    "Wearables",
    "Beauty",
    "Footwear",
    "Home",
    "Bags"
  ]
}
```

### Create Product (Admin Only)
```
POST /products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "New Product",
  "slug": "new-product",
  "description": "Description",
  "price": 199.99,
  "originalPrice": 249.99,
  "image": "url",
  "images": [],
  "category": "Audio",
  "badge": "New",
  "quantity": 50
}
```

### Update Product (Admin Only)
```
PATCH /products/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 179.99,
  "quantity": 30
}
```

### Delete Product (Admin Only)
```
DELETE /products/:id
Authorization: Bearer <admin-token>
```

---

## 🛒 Orders

### Create Order
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "prod-1",
      "quantity": 2,
      "price": 349
    }
  ],
  "shippingAddressId": "addr-1",
  "billingAddressId": "addr-1",
  "subtotal": 698,
  "shipping": 0,
  "tax": 59.83
}
```

### Get User's Orders
```
GET /orders
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "ord-1",
      "status": "DELIVERED",
      "subtotal": 698,
      "shipping": 0,
      "tax": 59.83,
      "total": 757.83,
      "items": [...],
      "createdAt": "..."
    }
  ]
}
```

### Get Order Details
```
GET /orders/:id
Authorization: Bearer <token>
```

### Cancel Order
```
PATCH /orders/:id/cancel
Authorization: Bearer <token>
```

### Get All Orders (Admin Only)
```
GET /orders/admin/all
Authorization: Bearer <admin-token>
Query params:
  - status: string (optional) - Filter by status
  - skip: number (optional)
  - take: number (optional)
```

### Update Order Status (Admin Only)
```
PATCH /orders/:id/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "SHIPPED"
}
```

Valid statuses:
- `PENDING`
- `CONFIRMED`
- `PROCESSING`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`
- `REFUNDED`

---

## 👤 Users

### Get Profile
```
GET /users/profile
Authorization: Bearer <token>
```

### Update Profile
```
PATCH /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Name",
  "avatar": "url"
}
```

### Get Wishlist
```
GET /users/wishlist
Authorization: Bearer <token>
```

### Add to Wishlist
```
POST /users/wishlist/:productId
Authorization: Bearer <token>
```

### Remove from Wishlist
```
DELETE /users/wishlist/:productId
Authorization: Bearer <token>
```

---

## 🛡️ Admin

### Get Dashboard Stats
```
GET /admin/dashboard
Authorization: Bearer <admin-token>
```

### Get All Users
```
GET /admin/users
Authorization: Bearer <admin-token>
```

### Get Sales Analytics
```
GET /admin/analytics/sales
Authorization: Bearer <admin-token>
```

### Get Traffic Analytics
```
GET /admin/analytics/traffic
Authorization: Bearer <admin-token>
```

---

## 🔄 Common Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* ... */ },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🔐 Authentication Token

After login/register, use token in all protected requests:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:3000/api/orders
```

Token expires in: **7 days** (configurable in `.env`)

---

## 📋 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden (Admin only) |
| 404 | Not Found |
| 409 | Conflict (User exists) |
| 500 | Server Error |

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "Test123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### Get Products
```bash
curl http://localhost:3000/api/products
```

### Get Products with Filter
```bash
curl "http://localhost:3000/api/products?category=Audio&sort=price-asc"
```

### Get Protected Route (with token)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/auth/me
```

---

## 🧩 Integration Tips

### Frontend API Client
```typescript
import { productsAPI, ordersAPI, authAPI } from '@/lib/api/client'

// Get products
const products = await productsAPI.getAll()

// Get user
const user = await authAPI.me(token)

// Create order
const order = await ordersAPI.create(orderData, token)
```

### Error Handling
```typescript
try {
  await productsAPI.getAll()
} catch (error) {
  console.error(error.message)
}
```

---

## 📚 Additional Resources

- Full Backend Documentation: `backend/README.md`
- Setup Guide: `SETUP.md`
- Project Analysis: `PROJECT_ANALYSIS.md`
- Prisma Schema: `backend/prisma/schema.prisma`

---

**Last Updated:** January 2024  
**API Version:** 1.0.0
