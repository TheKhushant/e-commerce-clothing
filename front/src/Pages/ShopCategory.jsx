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
    subCategories: [],
    discounts: [],
    colors: [],
    sizes: [],
    occasions: [],
    prints: [],
    materials: [],
    sleeves: [],
    neckTypes: [],
    characters: [],
    exclusive: false
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

    // Apply availability filter
    if (filters.availability === "in-stock") {
      filtered = filtered.filter(product => product.in_stock === undefined || product.in_stock === true);
    }

    // Apply discount filter
    if (filters.discounts.length > 0) {
      filtered = filtered.filter(product => {
        const discount = ((product.old_price - product.new_price) / product.old_price) * 100;
        return filters.discounts.some(range => {
          if (range === "0-20") return discount >= 0 && discount <= 20;
          if (range === "21-40") return discount >= 21 && discount <= 40;
          if (range === "41-60") return discount >= 41 && discount <= 60;
          if (range === "61-80") return discount >= 61 && discount <= 80;
          if (range === "81-100") return discount >= 81 && discount <= 100;
          return false;
        });
      });
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        filters.colors.includes(product.color?.toLowerCase())
      );
    }

    // Apply exclusive filter
    if (filters.exclusive) {
      filtered = filtered.filter(product => product.exclusive === true);
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
      case "trending":
        return sorted.sort((a, b) => (b.trending || 0) - (a.trending || 0));
      case "newest":
      default:
        return sorted;
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
    setCurrentPage(1);
  }, []);

  const updateArrayFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [0, 10000],
      ratings: 0,
      availability: "all",
      subCategories: [],
      discounts: [],
      colors: [],
      sizes: [],
      occasions: [],
      prints: [],
      materials: [],
      sleeves: [],
      neckTypes: [],
      characters: [],
      exclusive: false
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
    updateArrayFilter,
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

// Collapsible Filter Section Component
const CollapsibleFilterSection = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className={`filter-group collapsible ${isOpen ? 'open' : ''}`}>
      <div className="filter-header-collapsible" onClick={onToggle}>
        <h4>{title}</h4>
        <span className="collapse-icon">
          {isOpen ? '−' : '+'}
        </span>
      </div>
      {isOpen && (
        <div className="filter-content">
          {children}
        </div>
      )}
    </div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({ filters, updateFilter, updateArrayFilter, resetFilters, isMobileOpen, onClose }) => {
  const [openSections, setOpenSections] = useState({
    price: true,
    discounts: false,
    colors: false,
    sizes: false,
    ratings: false,
    occasions: false,
    prints: false,
    materials: false,
    sleeves: false,
    neckTypes: false,
    characters: false,
    availability: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const discountRanges = [
    { value: "0-20", label: "0% To 20%" },
    { value: "21-40", label: "21% To 40%" },
    { value: "41-60", label: "41% To 60%" },
    { value: "61-80", label: "61% To 80%" },
    { value: "81-100", label: "81% To 100%" }
  ];

  const colors = [
    "multi", "blue", "white", "black", "red", "green", "yellow", "grey", "navy blue", "orange", 
    "pink", "light blue", "beige", "brown", "maroon", "purple", "olive", "mustard", "teal", 
    "peach", "lavender", "ai aqua", "turquoise", "off white", "cream", "neo mint", "sea green", 
    "lime", "burgundy", "coral", "charcoal", "grey melange", "rust", "rosewater", "mauve", 
    "bottle green", "gold", "purist blue", "magenta", "neon", "lemon sherbet", "mellow yellow", 
    "print", "silver", "neutral", "nude", "taupe", "tan", "steel", "khaki"
  ];

  const sizes = [
    "0-3 m", "6-9 m", "9-12 m", "12-18 m", "18-24 m", "2-3 y", "3-4 y", "4-5 y", "6-7 y", 
    "7-8 y", "8-9 y", "9-10 y", "10-11 y", "11-12 y", "12-13 y", "13-14 y", "14-15 y", "15-16 y"
  ];

  const occasions = ["casual wear", "active wear", "loungewear"];
  const prints = [
    "printed", "graphic", "stripes", "typographic", "solids", "colour block", "placement print", 
    "front & back print", "self design", "tie & dye", "back print", "florals", "quirky", "checks", 
    "solid with work", "abstract", "camouflage", "polka dots", "tropical", "geometric"
  ];
  const materials = ["cotton", "cotton blend", "poly cotton", "polyester", "viscose"];
  const sleeves = ["short sleeves", "long sleeves", "sleeveless", "three quarter"];
  const neckTypes = [
    "round", "polo neck", "v neck", "crew neck", "hooded", "henleys neck", 
    "mandarin", "turtle neck", "stand collar"
  ];
  const characters = [
    "dinosaur", "marvel", "mickey & friends", "star wars", "tom & jerry", 
    "avengers", "iron man", "minions", "thomas & friends"
  ];

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
      <CollapsibleFilterSection 
        title="Price Range" 
        isOpen={openSections.price}
        onToggle={() => toggleSection('price')}
      >
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
      </CollapsibleFilterSection>

      {/* Discount Filter */}
      <CollapsibleFilterSection 
        title="Discounts" 
        isOpen={openSections.discounts}
        onToggle={() => toggleSection('discounts')}
      >
        {discountRanges.map(range => (
          <label key={range.value} className="checkbox-filter">
            <input
              type="checkbox"
              checked={filters.discounts.includes(range.value)}
              onChange={() => updateArrayFilter('discounts', range.value)}
            />
            <span className="checkmark"></span>
            <span>{range.label}</span>
          </label>
        ))}
      </CollapsibleFilterSection>

      {/* Color Filter */}
      <CollapsibleFilterSection 
        title="Color" 
        isOpen={openSections.colors}
        onToggle={() => toggleSection('colors')}
      >
        <div className="color-filter-grid">
          {colors.map(color => (
            <label key={color} className="color-filter">
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={() => updateArrayFilter('colors', color)}
              />
              <span className="color-checkmark"></span>
              <span className="color-name">{color}</span>
            </label>
          ))}
        </div>
      </CollapsibleFilterSection>

      {/* Size Filter */}
      <CollapsibleFilterSection 
        title="Size" 
        isOpen={openSections.sizes}
        onToggle={() => toggleSection('sizes')}
      >
        <div className="size-filter-grid">
          {sizes.map(size => (
            <label key={size} className="size-filter">
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => updateArrayFilter('sizes', size)}
              />
              <span className="size-checkmark"></span>
              <span>{size}</span>
            </label>
          ))}
        </div>
      </CollapsibleFilterSection>

      {/* Rating Filter */}
      <CollapsibleFilterSection 
        title="Customer Ratings" 
        isOpen={openSections.ratings}
        onToggle={() => toggleSection('ratings')}
      >
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
      </CollapsibleFilterSection>

      {/* Additional Filters */}
      <CollapsibleFilterSection 
        title="Occasion" 
        isOpen={openSections.occasions}
        onToggle={() => toggleSection('occasions')}
      >
        {occasions.map(occasion => (
          <label key={occasion} className="checkbox-filter">
            <input
              type="checkbox"
              checked={filters.occasions.includes(occasion)}
              onChange={() => updateArrayFilter('occasions', occasion)}
            />
            <span className="checkmark"></span>
            <span>{occasion}</span>
          </label>
        ))}
      </CollapsibleFilterSection>

      <CollapsibleFilterSection 
        title="Prints & Patterns" 
        isOpen={openSections.prints}
        onToggle={() => toggleSection('prints')}
      >
        {prints.map(print => (
          <label key={print} className="checkbox-filter">
            <input
              type="checkbox"
              checked={filters.prints.includes(print)}
              onChange={() => updateArrayFilter('prints', print)}
            />
            <span className="checkmark"></span>
            <span>{print}</span>
          </label>
        ))}
      </CollapsibleFilterSection>

      <CollapsibleFilterSection 
        title="Material" 
        isOpen={openSections.materials}
        onToggle={() => toggleSection('materials')}
      >
        {materials.map(material => (
          <label key={material} className="checkbox-filter">
            <input
              type="checkbox"
              checked={filters.materials.includes(material)}
              onChange={() => updateArrayFilter('materials', material)}
            />
            <span className="checkmark"></span>
            <span>{material}</span>
          </label>
        ))}
      </CollapsibleFilterSection>

      <CollapsibleFilterSection 
        title="Sleeve" 
        isOpen={openSections.sleeves}
        onToggle={() => toggleSection('sleeves')}
      >
        {sleeves.map(sleeve => (
          <label key={sleeve} className="checkbox-filter">
            <input
              type="checkbox"
              checked={filters.sleeves.includes(sleeve)}
              onChange={() => updateArrayFilter('sleeves', sleeve)}
            />
            <span className="checkmark"></span>
            <span>{sleeve}</span>
          </label>
        ))}
      </CollapsibleFilterSection>

      <CollapsibleFilterSection 
        title="Neck Type" 
        isOpen={openSections.neckTypes}
        onToggle={() => toggleSection('neckTypes')}
      >
        {neckTypes.map(neckType => (
          <label key={neckType} className="checkbox-filter">
            <input
              type="checkbox"
              checked={filters.neckTypes.includes(neckType)}
              onChange={() => updateArrayFilter('neckTypes', neckType)}
            />
            <span className="checkmark"></span>
            <span>{neckType}</span>
          </label>
        ))}
      </CollapsibleFilterSection>

      <CollapsibleFilterSection 
        title="Character" 
        isOpen={openSections.characters}
        onToggle={() => toggleSection('characters')}
      >
        {characters.map(character => (
          <label key={character} className="checkbox-filter">
            <input
              type="checkbox"
              checked={filters.characters.includes(character)}
              onChange={() => updateArrayFilter('characters', character)}
            />
            <span className="checkmark"></span>
            <span>{character}</span>
          </label>
        ))}
      </CollapsibleFilterSection>

      {/* Exclusive Products */}
      <div className="filter-group">
        <label className="checkbox-filter exclusive-filter">
          <input
            type="checkbox"
            checked={filters.exclusive}
            onChange={(e) => updateFilter('exclusive', e.target.checked)}
          />
          <span className="checkmark"></span>
          <span>Exclusive Products</span>
        </label>
      </div>

      {/* Availability Filter */}
      <CollapsibleFilterSection 
        title="Availability" 
        isOpen={openSections.availability}
        onToggle={() => toggleSection('availability')}
      >
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
      </CollapsibleFilterSection>
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
    updateArrayFilter,
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
          updateArrayFilter={updateArrayFilter}
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
                  <option value="trending">Trending</option>
                  <option value="discounted">Discounts</option>
                  <option value="price-high-low">High Price</option>
                  <option value="price-low-high">Low Price</option>
                  <option value="best-rated">Best Rated</option>
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

          {/* Load More Button */}
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