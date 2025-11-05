// Pages/Women/Women.js
import React from "react";
import CategoryLayout from "../../Components/CategoryLayout/CategoryLayout";

const Women = () => {
  const womenCategories = [
    {
      name: "Ethnic Wear",
      subcategories: [
        "Kurta Kurtis", "Sarees", "Ethnic Sets", "Ethnic Co Ord Sets",
        "Lehengas And Blouse", "Ethnic Dresses", "Skirts",
        "Leggings, Salwar & Churidaar", "Shawls & Dupattas", "Tapered Pants",
        "Unstitched & Semi Stitched", "Suits", "Winter Wear Accessories", "Combo"
      ]
    },
    {
      name: "Western Wear",
      subcategories: [
        "Dresses", "Tops", "Tunics", "T-shirts", "Jeans & Jeggings",
        "Trousers", "Co Ord Set", "Shirts", "Jumpsuits", "Shorts",
        "Kaftans", "Shrugs", "Cargos", "Joggers", "Shackets",
        "Sweaters & Sweatshirts", "Jackets, Blazers & Coats",
        "Mufflers, Gloves & Caps", "Stoles"
      ]
    },
    {
      name: "Sports & Activewear",
      subcategories: ["Swim Wear", "Tights", "Track Pants", "Sports Bra"]
    },
    {
      name: "Lingerie & Innerwear",
      subcategories: [
        "Bra", "Panties", "Sleepwear", "Lingerie Sets",
        "Sleepwear & Loungewear", "Shape Wear", "Camisoles & Thermals"
      ]
    },
    {
      name: "Western Wear Plus",
      subcategories: ["Dresses", "Tops", "Co Ords", "T-shirts", "Size"]
    },
    {
      name: "Jewellery",
      subcategories: [
        "Imitation Jewellery", "Earrings", "Necklace & Pendants",
        "Rings, Bangles & Bracelets"
      ]
    },
    {
      name: "Footwear",
      subcategories: [
        "Flats", "Heels", "Casual Shoes", "Flip Flops",
        "Sport Shoes & Sneakers", "Boots"
      ]
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
        "3Buddy Fashion", "Anubhutte", "Aurelia", "Azira", "Baggit",
        "Clovia", "Cottinfab", "Drape And Dazzle", "Globus", "Hive91",
        "II-JGA", "MELON - By Pluss", "Mojilaa", "Moomaya", "Oxolloxo",
        "Readiprint", "SOCH", "styli", "Trendif", "Vaamsi", "VAIRAGEE",
        "Vibhagyaa", "VredeVogel"
      ]
    }
  ];

  return <CategoryLayout title="Women" categories={womenCategories} />;
};

export default Women;