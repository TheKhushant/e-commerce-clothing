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
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

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
        <li onClick={() => setMenu("shop")}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="tx">Home</h3>
          </Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link to="/mens" style={{ textDecoration: "none" }}>
            <h3 className="tx">Men</h3>
          </Link>
          {menu === "mens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link to="/womens" style={{ textDecoration: "none" }}>
            <h3 className="tx">Women</h3>
          </Link>
          {menu === "womens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids" style={{ textDecoration: "none" }}>
            <h3 className="tx">Kids</h3>
          </Link>
          {menu === "kids" ? <hr /> : null}
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
