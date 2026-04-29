import { useState, useEffect } from 'react';
import { productsAPI } from '@/lib/api/client';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  badge?: string;
}

export function useProducts(params?: {
  category?: string;
  search?: string;
  sort?: string;
  skip?: number;
  take?: number;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const response: any = await productsAPI.getAll(params);
        setProducts(response.data.products);
        setTotal(response.data.total);
        setPages(response.data.pages);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params?.category, params?.search, params?.sort, params?.skip, params?.take]);

  return { products, total, pages, loading, error };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const response: any = await productsAPI.getById(id);
        setProduct(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
}
