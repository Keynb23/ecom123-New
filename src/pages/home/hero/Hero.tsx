import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../main';
import type { Product } from '../../../types/types';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero: React.FC = () => {
  const allProducts = useSelector((state: RootState) => state.products.products);
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const deals = allProducts.filter(product => product.price < 100 || product.category === "electronics").slice(0, 5);
    if (deals.length > 0) {
      setDealProducts(deals);
    } else {
      setDealProducts(allProducts.slice(0, 5));
    }
  }, [allProducts]);

  useEffect(() => {
    if (dealProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % dealProducts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dealProducts]);

  const nextSlide = () => {
    if (dealProducts.length > 0) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % dealProducts.length);
    }
  };

  const prevSlide = () => {
    if (dealProducts.length > 0) {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + dealProducts.length) % dealProducts.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (dealProducts.length === 0) {
    return null;
  }

  const getBrand = (title: string | undefined) => {
    if (!title) {
      return 'Unknown Brand';
    }
    const brandMatch = title.match(/^(\w+)/);
    return brandMatch ? brandMatch[1] : 'Generic';
  };

  return (
    <div className="hero-carousel-container">
      <h2 className="carousel-title">Today's Hot Deals!</h2>
      <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {dealProducts.map((product) => (
          <div key={product.id} className="carousel-slide">
            <div className="carousel-slide-content">
              <div className="carousel-image-container">
                {product.image && <img src={product.image} alt={product.title} />}
              </div>
              <div className="carousel-details">
                <h3>{product.title}</h3>
                <p className="carousel-brand">Brand: {getBrand(product.title)}</p>
                <p className="carousel-price">Deal Price: ${product.price?.toFixed(2)}</p>
                <p className="carousel-description">{product.description?.substring(0, 150)}...</p>
                {product.rating ? (
                  <p className="carousel-rating">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                ) : (
                  <p className="carousel-rating">No rating available</p>
                )}
                <Link to={`/products/${product.id}`} className="carousel-button">
                  View Deal
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-nav-button prev" onClick={prevSlide}>&#10094;</button>
      <button className="carousel-nav-button next" onClick={nextSlide}>&#10095;</button>

      <div className="carousel-dots">
        {dealProducts.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Hero;