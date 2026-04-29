const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, ...fetchOptions } = options;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }
  
  return response.json();
}

// Auth API
export const authAPI = {
  register: (data: { email: string; name: string; password: string }, token?: string) =>
    apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data), token }),
  
  login: (data: { email: string; password: string }) =>
    apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  
  me: (token: string) => apiFetch('/auth/me', { token }),
};

// Products API
export const productsAPI = {
  getAll: (params?: { category?: string; search?: string; sort?: string; skip?: number; take?: number }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.sort) query.append('sort', params.sort);
    if (params?.skip) query.append('skip', String(params.skip));
    if (params?.take) query.append('take', String(params.take));
    
    return apiFetch(`/products?${query}`);
  },
  
  getById: (id: string) => apiFetch(`/products/${id}`),
  
  create: (data: any, token: string) =>
    apiFetch('/products', { method: 'POST', body: JSON.stringify(data), token }),
  
  update: (id: string, data: any, token: string) =>
    apiFetch(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(data), token }),
  
  delete: (id: string, token: string) =>
    apiFetch(`/products/${id}`, { method: 'DELETE', token }),
  
  getCategories: () => apiFetch('/products/categories'),
};

// Orders API
export const ordersAPI = {
  create: (data: any, token: string) =>
    apiFetch('/orders', { method: 'POST', body: JSON.stringify(data), token }),
  
  getAll: (token: string) => apiFetch('/orders', { token }),
  
  getById: (id: string, token: string) => apiFetch(`/orders/${id}`, { token }),
  
  cancel: (id: string, token: string) =>
    apiFetch(`/orders/${id}/cancel`, { method: 'PATCH', token }),
  
  // Admin
  getAllAdmin: (params?: { status?: string; skip?: number; take?: number }, token?: string) => {
    const query = new URLSearchParams();
    if (params?.status) query.append('status', params.status);
    if (params?.skip) query.append('skip', String(params.skip));
    if (params?.take) query.append('take', String(params.take));
    
    return apiFetch(`/orders/admin/all?${query}`, { token });
  },
  
  updateStatus: (id: string, status: string, token: string) =>
    apiFetch(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }), token }),
};

// Users API
export const usersAPI = {
  getProfile: (token: string) => apiFetch('/users/profile', { token }),
  
  updateProfile: (data: any, token: string) =>
    apiFetch('/users/profile', { method: 'PATCH', body: JSON.stringify(data), token }),
  
  getWishlist: (token: string) => apiFetch('/users/wishlist', { token }),
  
  addToWishlist: (productId: string, token: string) =>
    apiFetch(`/users/wishlist/${productId}`, { method: 'POST', token }),
  
  removeFromWishlist: (productId: string, token: string) =>
    apiFetch(`/users/wishlist/${productId}`, { method: 'DELETE', token }),
};

// Admin API
export const adminAPI = {
  getDashboard: (token: string) => apiFetch('/admin/dashboard', { token }),
  
  getUsers: (token: string) => apiFetch('/admin/users', { token }),
  
  getSalesAnalytics: (token: string) => apiFetch('/admin/analytics/sales', { token }),
  
  getTrafficAnalytics: (token: string) => apiFetch('/admin/analytics/traffic', { token }),
};
