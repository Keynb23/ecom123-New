import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import type { RootState, AppDispatch } from '../../main';
import { setProducts, setStatus, setError } from '../../store/slices/productSlice';
import type { Product } from '../../types/types';
import { Link } from 'react-router-dom';
import AddToCartButton from '../../components/cart/AddToCartBtn';
import Filter from '../../components/filter/Filter';

import './Products.css';

const ProductsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (status === 'idle') {
        dispatch(setStatus('loading'));
        try {
          const response = await axios.get<any>('https://fakestoreapi.in/api/products');
          const productsArray = response.data.products || response.data.data;

          if (Array.isArray(productsArray)) {
            dispatch(setProducts(productsArray));
          } else {
            console.error("API response was an object, but 'products' or 'data' property is not an array:", response.data);
            dispatch(setError("API response format unexpected. Expected products array inside 'products' or 'data' property."));
            dispatch(setStatus('failed'));
          }
        } catch (err: any) {
          console.error("Error fetching products:", err);
          dispatch(setError(err.message || 'Failed to fetch products'));
          dispatch(setStatus('failed'));
        }
      }
    };

    fetchAllProducts();
  }, [status, dispatch]);

  const getBrand = (title: string | undefined) => {
    if (!title) {
      return 'Unknown Brand';
    }
    const brandMatch = title.match(/^(\w+)/);
    return brandMatch ? brandMatch[1] : 'Generic';
  };

  if (status === 'loading') {
    return <div className="products-container">Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className="products-container error-message">Error: {error}</div>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <div className="products-container">No products found.</div>;
  }

  return (
    <div className="products-page-layout"> 
      <div className="filter-section">
        <Filter /> 
      </div>
      <div className="products-grid-section">
        <div className="products-grid">
          {products.map((product: Product) => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`} className="product-link">
                <div className="product-image-container">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-details">
                  <p className="product-brand">{getBrand(product.title)}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                </div>
              </Link>
              <AddToCartButton product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;