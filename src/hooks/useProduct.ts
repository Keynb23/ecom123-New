import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Product } from '../types/types';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Product[]>("https://fakestoreapi.in/api/products");
        setProducts(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message); 
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  return { products, loading, error };
};

export default useProducts;