// Pages/Kids/Kids.js
import React from "react";
import CategoryLayout from "../../Components/CategoryLayout/CategoryLayout";

const Kids = () => {
  const kidsCategories = [
    {
      name: "Boys",
      subcategories: [
        "T-shirts", "Shirts", "Bottom Wear", "Ethnic Wear",
        "Sweater & Sweatshirt", "Coats & Jackets", "Innerwear & Nightwear",
        "Twin Sets & Dungrees", "Suit Sets"
      ]
    },
    {
      name: "Shop By Age (Boys)",
      subcategories: ["0-2 Years", "2-6 Years", "6-12 Years", "12-16 Years"]
    },
    {
      name: "Winter Wear (Boys)",
      subcategories: ["Sweatshirts", "Sweater & Cardigans", "Jackets & Coats"]
    },
    {
      name: "Girls",
      subcategories: [
        "Dresses & Frocks", "Tees & Tops", "Bottom Wear", "Ethnic Wear",
        "SweaterSweatshirts & Cardigans", "Coats & Jackets", "Twin Sets & Jump Suits",
        "Innerwear & Nightwear", "Leggings", "Party Gowns", "Girls Panty"
      ]
    },
    {
      name: "Shop By Age (Girls)",
      subcategories: ["0-2 Years", "2-6 Years", "6-12 Years", "12-16 Years"]
    },
    {
      name: "Footwear",
      subcategories: [
        "Sandals & Floaters", "Casual Shoes", "Sports Shoes", "Formal Shoes"
      ]
    },
    {
      name: "Accessories",
      subcategories: ["Socks", "Cap", "Sunglasses", "Bag"]
    },
    {
      name: "Bed & Bath",
      subcategories: ["Bedsheet", "Mat", "Blanket", "Curtain"]
    },
    {
      name: "Infants",
      subcategories: [
        "Onesizes & Rompers", "Frocks", "Twin Sets", "Diaper"
      ]
    },
    {
      name: "Brands",
      subcategories: [
        "Eavan", "Under Fourteen Only", "BEING NAUGHTY", "Fashion Dream",
        "MoMaa", "Polka Tots", "U.S- Polo Assm Kids", "TALES & STORIES",
        "NeuVin"
      ]
    }
  ];

  return <CategoryLayout title="Kids" categories={kidsCategories} />;
};

export default Kids;