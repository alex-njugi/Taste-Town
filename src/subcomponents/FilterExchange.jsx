import React, { useState } from 'react';
import Productcard from './Productcard';
import FilterOption from './FilterOption';

const FilterExchange = ({ products }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategories.length === 0
    ? products
    : products.filter(product =>
        selectedCategories.includes(product.category)
      );

  return (
    <div className="filter-exchange">
      <FilterOption toggleSidebar={toggleSidebar} />

      <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
        <h3>Filter by Category</h3>
        {categories.map((category, id) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
        <button className='sidebtn' onClick={toggleSidebar}>Close</button>
      </div>

      <Productcard products={filteredProducts} />
    </div>
  );
};

export default FilterExchange;