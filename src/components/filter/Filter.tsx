import './Filter.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Product } from '../../types/types'; 
import { setProducts } from '../../store/slices/productSlice'; 

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state: any) => state.products.allProducts) as Product[]; 
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [maxRating, setMaxRating] = useState<number | ''>('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const uniqueCategories = [...new Set(allProducts.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [allProducts]);

  const applyFilters = () => {
    let filtered = [...allProducts]; 

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (minPrice !== '') {
      filtered = filtered.filter(product => product.price >= minPrice);
    }
    if (maxPrice !== '') {
      filtered = filtered.filter(product => product.price <= maxPrice);
    }

    if (minRating !== '') {
      filtered = filtered.filter(product => product.rating.rate >= minRating);
    }
    if (maxRating !== '') {
      filtered = filtered.filter(product => product.rating.rate <= maxRating);
    }

    dispatch(setProducts(filtered)); 
  };

  return (
    <div className="filter-container">
      <h2>Filter Products</h2>
      <div className="filter-options">
        <label>
          Category:
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label>
          Price Range:
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            placeholder="Min Rating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value === '' ? '' : parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max Rating"
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value === '' ? '' : parseFloat(e.target.value))}
          />
        </label>
        <button type="button" onClick={applyFilters}>Apply Filters</button>
      </div>
    </div>
  );
}

export default Filter;