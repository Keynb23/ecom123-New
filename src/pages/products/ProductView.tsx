import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Product } from "../../types/types";
import "./ProductView.css";
import AddToCartButton from "../../components/cart/AddToCartBtn";

const ProductView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(
          `https://fakestoreapi.in/api/products/${id}`
        );
        setProduct(response.data.product); // Change this line to access the nested product
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getBrand = (title: string | undefined) => {
    if (!title) {
      return "Unknown Brand";
    }
    const brandMatch = title.match(/^(\w+)/);
    return brandMatch ? brandMatch[1] : "Generic";
  };

  if (loading) {
    return (
      <div className="product-view-container">Loading product details...</div>
    );
  }

  if (error) {
    return (
      <div className="product-view-container error-message">Error: {error}</div>
    );
  }

  if (!product) {
    return <div className="product-view-container">Product not found.</div>;
  }

  return (
    <div className="product-view-container">
      <div className="product-view-content">
        <div className="product-view-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-view-details">
          <h2>{product.title}</h2>
          <p className="view-brand">Brand: {getBrand(product.title)}</p>
          <p className="view-category">Category: {product.category}</p>
          <p className="view-price">${product.price?.toFixed(2)}</p>
          <p className="view-description">{product.description}</p>
          {product.rating && (
            <p className="view-rating">
              Rating: {product.rating.rate} / 5 ({product.rating.count} reviews)
            </p>
          )}
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductView;