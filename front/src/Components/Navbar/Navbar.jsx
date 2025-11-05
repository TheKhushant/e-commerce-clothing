import React, { useContext, useRef, useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = () => {
  let [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const menuRef = useRef();
  const dropdownRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const toggleCategoryDropdown = (category) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Category data
  const categories = {
    women: {
      "Sports & Activewear": [
        "Swim Wear", "Tights", "Track Pants", "Sports Bra"
      ],
      "Western Wear Plus": [
        "Dresses", "Tops", "Co Ords", "T-shirts", "Size"
      ],      
      "Ethnic Wear": [
        "Kurta Kurtis", "Sarees", "Ethnic Sets", "Ethnic Co Ord Sets",
        "Lehengas And Blouse", "Ethnic Dresses", "Skirts", 
        "Leggings, Salwar & Churidaar", "Shawls & Dupattas", 
        "Tapered Pants", "Unstitched & Semi Stitched", "Suits",
        "Winter Wear Accessories", "Combo"
      ],
      "Western Wear": [
        "Dresses", "Tops", "Tunics", "T-shirts", "Jeans & Jeggings",
        "Trousers", "Co Ord Set", "Shirts", "Jumpsuits", "Shorts",
        "Kaftans", "Shrugs", "Cargos", "Joggers", "Shackets",
        "Sweaters & Sweatshirts", "Jackets, Blazers & Coats",
        "Mufflers, Gloves & Caps", "Stoles"
      ],      
    },
    men: {
      "Top Wear": [
        "Casual Shirts", "Co Ord Set", "Formal Shirts", "Polo T Shirts",
        "Suits & Blazers", "T-shirts", "Oversized T Shirts"
      ],
      "Bottom Wear": [
        "Cargos", "Casual Trousers", "Formal Trousers", "Jeans",
        "Joggers", "Shorts & Three Fourth"
      ],
      "Ethnic Wear": [
        "Ethnic Wear Sets", "Ethnic Bottom Wear", "Kurtas",
        "Nehru Jackets", "Waist Coat"
      ],
      "Sports Wear": [
        "Shorts", "T-Shirts", "Track Pants", "Track Suits"
      ],
      "Plus Size": [
        "Bottom Wear", "Inner Wear", "Top Wear"
      ],
      "Footwear": [
        "Casual Shoes", "Formal Shoes", "Jutis And Mojaris",
        "Sports Shoes", "Slippers & Sandals"
      ],
      "Winter Wear": [
        "Gloves", "Jackets", "Shackets", "Shawls & Mufflers",
        "Sweaters", "Sweatshirts", "Thermals"
      ],
      "Innerwear": [
        "Boxers", "Briefs", "Vests"
      ],
    },
    kids: {
      "Boys": [
        "T-shirts", "Shirts", "Bottom Wear", "Ethnic Wear",
        "Sweater & Sweatshirt", "Coats & Jackets", "Innerwear & Nightwear",
        "Twin Sets & Dungrees", "Suit Sets"
      ],
      "Shop By Age (Boys)": [
        "0-2 Years", "2-6 Years", "6-12 Years", "12-16 Years"
      ],
      "Winter Wear (Boys)": [
        "Sweatshirts", "Sweater & Cardigans", "Jackets & Coats"
      ],
      "Girls": [
        "Dresses & Frocks", "Tees & Tops", "Bottom Wear", "Ethnic Wear",
        "SweaterSweatshirts & Cardigans", "Coats & Jackets", "Twin Sets & Jump Suits",
        "Innerwear & Nightwear", "Leggings", "Party Gowns", "Girls Panty"
      ],
      "Shop By Age (Girls)": [
        "0-2 Years", "2-6 Years", "6-12 Years", "12-16 Years"
      ],
      "Footwear": [
        "Sandals & Floaters", "Casual Shoes", "Sports Shoes", "Formal Shoes"
      ],      
    }
  };

  return (
    <div className={`nav ${isScrolled ? "nav-scrolled" : ""}`}>
      <Link to="/" style={{ textDecoration: "none" }} className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </Link>
      <img
        onClick={dropdown_toggle}
        className="nav-dropdown"
        src={nav_dropdown}
        alt="dropdown"
      />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => {setMenu("shop"); setActiveDropdown(null);}}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="tx">Home</h3>
          </Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        
        {/* Women Dropdown */}
        <li 
          className={`nav-item-with-dropdown ${activeDropdown === 'women' ? 'active' : ''}`}
          onMouseEnter={() => setActiveDropdown('women')}
        >
          <div 
            className="dropdown-header"
            onClick={() => toggleCategoryDropdown('women')}
          >
            <Link to="/womens" style={{ textDecoration: "none" }} onClick={() => setMenu("womens")}>
              <h3 className="tx">Women</h3>
            </Link>
            <span className="dropdown-arrow">▼</span>
          </div>
          {menu === "womens" ? <hr /> : null}
          
          {activeDropdown === 'women' && (
            <div className="mega-dropdown" ref={dropdownRef}>
              <div className="dropdown-content">
                {Object.entries(categories.women).map(([category, items]) => (
                  <div key={category} className="dropdown-column">
                    <h4>{category}</h4>
                    <ul>
                      {items.map((item, index) => (
                        <li key={index}>
                          <Link 
                            to={`/womens/${item.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')}`}
                            onClick={() => {
                              setMenu("womens");
                              setActiveDropdown(null);
                            }}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </li>

        {/* Men Dropdown */}
        <li 
          className={`nav-item-with-dropdown ${activeDropdown === 'men' ? 'active' : ''}`}
          onMouseEnter={() => setActiveDropdown('men')}
        >
          <div 
            className="dropdown-header"
            onClick={() => toggleCategoryDropdown('men')}
          >
            <Link to="/mens" style={{ textDecoration: "none" }} onClick={() => setMenu("mens")}>
              <h3 className="tx">Men</h3>
            </Link>
            <span className="dropdown-arrow">▼</span>
          </div>
          {menu === "mens" ? <hr /> : null}
          
          {activeDropdown === 'men' && (
            <div className="mega-dropdown" ref={dropdownRef}>
              <div
                className={`dropdown-content ${
                  activeDropdown === "women" ? "two-row-grid" : ""
                } ${activeDropdown === "men" ? "two-row-grid" : ""}`}
              >
                {Object.entries(categories[activeDropdown]).map(([category, items]) => (
                  <div key={category} className="dropdown-column">
                    <h4>{category}</h4>
                    <ul>
                      {items.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={`/${activeDropdown}/${item
                              .toLowerCase()
                              .replace(/[^a-zA-Z0-9]+/g, "-")}`}
                            onClick={() => {
                              setMenu(activeDropdown);
                              setActiveDropdown(null);
                            }}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          )}
        </li>

        {/* Kids Dropdown */}
        <li 
          className={`nav-item-with-dropdown ${activeDropdown === 'kids' ? 'active' : ''}`}
          onMouseEnter={() => setActiveDropdown('kids')}
        >
          <div 
            className="dropdown-header"
            onClick={() => toggleCategoryDropdown('kids')}
          >
            <Link to="/kids" style={{ textDecoration: "none" }} onClick={() => setMenu("kids")}>
              <h3 className="tx">Kids</h3>
            </Link>
            <span className="dropdown-arrow">▼</span>
          </div>
          {menu === "kids" ? <hr /> : null}
          
          {activeDropdown === 'kids' && (
            <div className="mega-dropdown" ref={dropdownRef}>
              <div className="dropdown-content">
                {Object.entries(categories.kids).map(([category, items]) => (
                  <div key={category} className="dropdown-column">
                    <h4>{category}</h4>
                    <ul>
                      {items.map((item, index) => (
                        <li key={index}>
                          <Link 
                            to={`/kids/${item.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')}`}
                            onClick={() => {
                              setMenu("kids");
                              setActiveDropdown(null);
                            }}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </li>
      </ul>
      
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            className="small-button"
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="small-button">Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="cart" className="cart-icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;