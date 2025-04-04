import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductListFilter = ({ data, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFeatured, setIsFeatured] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://34.131.41.101:3000/api/product/categories', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`
          }
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Apply filters whenever any filter criteria changes
  useEffect(() => {
    const filteredData = data.filter((item) => {
      return (
        (selectedCategory === '' || item.category === selectedCategory) &&
        (searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (isFeatured === '' || item.isFeatured === (isFeatured === 'true')) &&
        (stockFilter === '' || (stockFilter === 'low' ? item.stock < 50 : item.stock >= 50))
      );
    });
    
    onFilter(filteredData);
  }, [data, selectedCategory, searchTerm, isFeatured, stockFilter, onFilter]);

  return (
    <div className="row mb-4">
      <div className="col-md-3 mb-3 mb-md-0">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          value={isFeatured}
          onChange={(e) => setIsFeatured(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Featured</option>
          <option value="false">Non-Featured</option>
        </select>
      </div>
      
      <div className="col-md-3">
        <select
          className="form-select"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="">All Stock</option>
          <option value="low">Low Stock (&lt; 50)</option>
          <option value="high">High Stock (≥ 50)</option>
        </select>
      </div>
      
      <div className="col-md-3">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProductListFilter;