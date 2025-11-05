import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

// Custom hook for filtering and sorting
const useProductFilter = (allProducts, category) => {
  const [filters, setFilters] = useState({
    priceRange: [500, 10000],
    ratings: 0,
    availability: "all",
    subCategories: []
  });
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter products based on category and filters
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => 
      product.category?.toLowerCase() === category?.toLowerCase()
    );


    // Apply price filter
    filtered = filtered.filter(product => 
      product.new_price >= filters.priceRange[0] && 
      product.new_price <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.ratings > 0) {
      filtered = filtered.filter(product => 
        (product.rating || 0) >= filters.ratings
      );
    }

    // Apply availability filter (mock - assuming all are in stock for now)
    if (filters.availability === "in-stock") {
      filtered = filtered.filter(product => product.in_stock === undefined || product.in_stock === true);
    }


    return filtered;
  }, [allProducts, category, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case "price-low-high":
        return sorted.sort((a, b) => a.new_price - b.new_price);
      case "price-high-low":
        return sorted.sort((a, b) => b.new_price - a.new_price);
      case "best-rated":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "discounted":
        return sorted.sort((a, b) => {
          const discountA = ((a.old_price - a.new_price) / a.old_price) * 100;
          const discountB = ((b.old_price - b.new_price) / b.old_price) * 100;
          return discountB - discountA;
        });
      case "newest":
      default:
        return sorted; // Assuming products are already in order by ID
    }
  }, [filteredProducts, sortBy]);

  // Paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [0, 10000],
      ratings: 0,
      availability: "all",
      subCategories: []
    });
    setCurrentPage(1);
  }, []);

  return {
    products: paginatedProducts,
    allFilteredProducts: sortedProducts,
    filters,
    sortBy,
    currentPage,
    totalPages,
    itemsPerPage,
    totalProducts: filteredProducts.length,
    updateFilter,
    setSortBy,
    setCurrentPage,
    resetFilters
  };
};

// Loading Skeleton Component
const ProductSkeleton = () => (
  <div className="product-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-text short"></div>
    <div className="skeleton-price"></div>
  </div>
);

// Filter Sidebar Component
const FilterSidebar = ({ filters, updateFilter, resetFilters, isMobileOpen, onClose }) => {
  const priceMarks = {
    0: '₹0',
    2500: '₹2.5k',
    5000: '₹5k',
    7500: '₹7.5k',
    10000: '₹10k+'
  };

  return (
    <div className={`filter-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="clear-filters" onClick={resetFilters}>
          Clear All
        </button>
        {isMobileOpen && (
          <button className="close-filters" onClick={onClose}>
            ✕
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
      <h4>Price Range</h4>
      <div className="price-range-advanced">
        <div className="range-inputs">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={filters.priceRange[0]}
            onChange={(e) => {
              const minVal = Math.min(parseInt(e.target.value), filters.priceRange[1] - 500);
              updateFilter("priceRange", [minVal, filters.priceRange[1]]);
            }}
            onFocus={(e) => e.target.scrollIntoView({ block: "nearest" })}
            className="range-min"
          />
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) => {
              const maxVal = Math.max(parseInt(e.target.value), filters.priceRange[0] + 500);
              updateFilter("priceRange", [filters.priceRange[0], maxVal]);
            }}
            className="range-max"
          />
        </div>

          {/* Input boxes for direct number entry */}
          <div className="price-input-boxes">
            <div>
              <label>Min:</label>
              <input
                type="number"
                min="0"
                max="10000"
                step="100"
                value={filters.priceRange[0]}
                onChange={(e) => {
                  const newMin = Math.min(parseInt(e.target.value) || 0, filters.priceRange[1] - 500);
                  updateFilter("priceRange", [newMin, filters.priceRange[1]]);
                }}
              />
            </div>
            <span className="price-separator">-</span>
            <div>
              <label>Max:</label>
              <input
                type="number"
                min="0"
                max="10000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const newMax = Math.max(parseInt(e.target.value) || 0, filters.priceRange[0] + 500);
                  updateFilter("priceRange", [filters.priceRange[0], newMax]);
                }}
              />
            </div>
          </div>

          <div className="price-labels">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>


      {/* Rating Filter */}
      <div className="filter-group">
        <h4>Customer Ratings</h4>
        {[4, 3, 2, 1].map(rating => (
          <label key={rating} className="rating-filter">
            <input
              type="radio"
              name="rating"
              checked={filters.ratings === rating}
              onChange={() => updateFilter('ratings', rating)}
            />
            <span className="stars">
              {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
            </span>
          </label>
        ))}
      </div>

      {/* Availability Filter */}
      <div className="filter-group">
        <h4>Availability</h4>
        <label className="availability-filter">
          <input
            type="radio"
            name="availability"
            value="all"
            checked={filters.availability === 'all'}
            onChange={(e) => updateFilter('availability', e.target.value)}
          />
          All Items
        </label>
        <label className="availability-filter">
          <input
            type="radio"
            name="availability"
            value="in-stock"
            checked={filters.availability === 'in-stock'}
            onChange={(e) => updateFilter('availability', e.target.value)}
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
};

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    products,
    allFilteredProducts,
    filters,
    sortBy,
    currentPage,
    totalPages,
    itemsPerPage,
    totalProducts,
    updateFilter,
    setSortBy,
    setCurrentPage,
    resetFilters
  } = useProductFilter(all_product, props.category);

  // Simulate API loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [filters, sortBy, currentPage]);

  // Mock function for future API integration
  const fetchProducts = useCallback(async () => {
    // Future API integration point:
    // const response = await fetch(`/api/products?category=${props.category}&page=${currentPage}&sort=${sortBy}`);
    // return await response.json();
    
    // Currently using context data
    return all_product.filter(product => 
      product.category.toLowerCase() === props.category.toLowerCase()
    );
  }, [all_product, props.category, currentPage, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        
        {startPage > 1 && (
          <>
            <button className="pagination-btn" onClick={() => handlePageChange(1)}>1</button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}
        
        {pages}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button className="pagination-btn" onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </button>
          </>
        )}
        
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="shop-category">
      {/* Banner Section */}
      <div className="shopcategory-banner-section">
        <img className="shopcategory-banner" src={props.banner} alt={props.category} />
        <div className="banner-overlay">
          <h1 className="category-title">{props.category}</h1>
          <div className="breadcrumb">
            <span>Home</span> 
            <span className="breadcrumb-separator">/</span>
            <span className="current-category">{props.category}</span>
          </div>
        </div>
      </div>

      <div className="shopcategory-container">
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
          isMobileOpen={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
        />

        {/* Main Content */}
        <div className="shopcategory-main">
          {/* Sticky Header Bar */}
          <div className="shopcategory-header-sticky">
            <div className="shopcategory-stats">
              <p>
                Showing <span>{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalProducts)}</span> of {totalProducts} products
              </p>
            </div>
            
            <div className="shopcategory-controls">
              <button 
                className="mobile-filter-btn"
                onClick={() => setShowMobileFilters(true)}
              >
                Filters
              </button>
              
              <div className="shopcategory-sort">
                <label>Sort by:</label>
                <select value={sortBy} onChange={handleSortChange}>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="best-rated">Best Rated</option>
                  <option value="discounted">Most Discounted</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="shopcategory-products">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : products.length > 0 ? (
              // Products Grid
              products.map((item, idx) => (
                <Item
                  key={idx}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                  rating={item.rating}
                  category={item.category}
                />
              ))
            ) : (
              // No Products Found
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button className="reset-filters-btn" onClick={resetFilters}>
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {products.length > 0 && renderPagination()}

          {/* Load More Button (Alternative to Pagination) */}
          {currentPage < totalPages && (
            <div className="shopcategory-loadmore">
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                className="load-more-btn"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;