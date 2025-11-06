import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "./Assets/data";

// Shop component for displaying filtered products.
// Handles navbar category/subcategory from URL params and sidebar filters.
// Products are images only (as per goal), in a responsive grid.
// Filters are multi-select checkboxes; clears on button click.
// Filtering logic: First by category/subcategory, then by selected filter intersections.

const Shop = () => {
  const { category: urlCategory, subcategory: urlSubcategory } = useParams();
  const [selectedFilters, setSelectedFilters] = useState({
    size: [],
    color: [],
    occasion: [],
    print: [],
    sleeves: [],
    discount: [],
    character: []
  });

  // Handle checkbox toggle for filters (multi-select)
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const current = prev[filterType] || [];
      if (current.includes(value)) {
        // Remove if already selected
        return {
          ...prev,
          [filterType]: current.filter((v) => v !== value)
        };
      } else {
        // Add if not selected
        return {
          ...prev,
          [filterType]: [...current, value]
        };
      }
    });
  };

  // Clear all selected filters
  const clearFilters = () => {
    setSelectedFilters({
      size: [],
      color: [],
      occasion: [],
      print: [],
      sleeves: [],
      discount: [],
      character: []
    });
  };

  // Fixed filter options (matching example categories)
  const filterOptions = {
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Blue", "Green", "Black", "White"],
    occasion: ["Casual", "Formal", "Party", "Festive"],
    print: ["Solid", "Striped", "Checked", "Floral"],
    sleeves: ["Full", "Half", "Sleeveless"],
    discount: ["10%", "20%", "30%", "50%"],
    character: ["Marvel", "DC", "Disney", "Anime"]
  };

  // Filter products logic
  let filteredProducts = [...products]; // Clone to avoid mutation

  // Filter by URL category (e.g., /womens -> mainCategory === 'women')
  if (urlCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.mainCategory === urlCategory
    );
  }

  // Filter by URL subcategory (e.g., /womens/t-shirts -> subCategory === 't-shirts')
  if (urlSubcategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.subCategory === urlSubcategory
    );
  }

  // Apply selected filters (intersection: product must match at least one selected value per type)
  Object.keys(selectedFilters).forEach((filterType) => {
    if (selectedFilters[filterType].length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product[filterType]?.some((val) =>
          selectedFilters[filterType].includes(val)
        )
      );
    }
  });

  // Render a filter section (reused for each type)
  const renderFilterSection = (title, type) => (
    <div className="filter-section" key={type}>
      <h3>{title}</h3>
      <ul>
        {filterOptions[type].map((option) => (
          <li key={option}>
            <label>
              <input
                type="checkbox"
                checked={selectedFilters[type].includes(option)}
                onChange={() => handleFilterChange(type, option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="shop-container">
      {/* Sidebar Filters */}
      <div className="sidebar">
        {Object.entries({
          size: "Size",
          color: "Color",
          occasion: "Occasion",
          print: "Print",
          sleeves: "Sleeves",
          discount: "Discount",
          character: "Character"
        }).map(([type, title]) => renderFilterSection(title, type))}
        <button onClick={clearFilters} className="clear-filters-btn">
          Clear All Filters
        </button>
      </div>

      {/* Product Grid */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <img
                  src={require(product.image)}
                  alt={product.name}
                  className="product-image"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">No products found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;