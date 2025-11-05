// Pages/Men/Men.js
import React from "react";
import CategoryLayout from "../../Components/CategoryLayout/CategoryLayout";

const Men = () => {
  const menCategories = [
    {
      name: "Top Wear",
      subcategories: [
        "Casual Shirts", "Co Ord Set", "Formal Shirts", "Polo T Shirts",
        "Suits & Blazers", "T-shirts", "Oversized T Shirts"
      ]
    },
    {
      name: "Bottom Wear",
      subcategories: [
        "Cargos", "Casual Trousers", "Formal Trousers", "Jeans",
        "Joggers", "Shorts & Three Fourth"
      ]
    },
    {
      name: "Ethnic Wear",
      subcategories: [
        "Ethnic Wear Sets", "Ethnic Bottom Wear", "Kurtas",
        "Nehru Jackets", "Waist Coat"
      ]
    },
    {
      name: "Sports Wear",
      subcategories: ["Shorts", "T-Shirts", "Track Pants", "Track Suits"]
    },
    {
      name: "Plus Size",
      subcategories: ["Bottom Wear", "Inner Wear", "Top Wear"]
    },
    {
      name: "Footwear",
      subcategories: [
        "Casual Shoes", "Formal Shoes", "Jutis And Mojaris",
        "Sports Shoes", "Slippers & Sandals"
      ]
    },
    {
      name: "Winter Wear",
      subcategories: [
        "Gloves", "Jackets", "Shackets", "Shawls & Mufflers",
        "Sweaters", "Sweatshirts", "Thermals"
      ]
    },
    {
      name: "Accessories Combos",
      subcategories: []
    },
    {
      name: "Accessories",
      subcategories: [
        "Caps And Hats", "Cufflinks & Bracelets", "Lapel Pins & Brooch",
        "Handkerchiefs", "Headphones & Speakers", "Socks", "Ties & Pocket Squares"
      ]
    },
    {
      name: "Innerwear",
      subcategories: ["Boxers", "Briefs", "Vests"]
    },
    {
      name: "Electronics",
      subcategories: [
        "Smart Watches", "Bluetooth Speaker", "Earbuds", "Bluetooth Neckband"
      ]
    },
    {
      name: "Brands",
      subcategories: [
        "Action Milano", "AD By Arvind", "ACJSK", "BENTOKE", "CAMEY",
        "Classic Polo", "CRIMSOUNE CLUB", "Deshbandhukhadi", "Dollar",
        "Duke", "HanglJp", "HI-JETRAp", "INKKR", "Jompers", "Ketch",
        "ONE SKY", "SHOWOFF", "STARFOX", "TAB91", "GETGOLF", "RIGO",
        "TWENTY EIGHT", "TS Lifestyle"
      ]
    }
  ];

  return <CategoryLayout title="Men" categories={menCategories} />;
};

export default Men;