// Components/CategoryLayout/CategoryLayout.js
import React from "react";
import "./CategoryLayout.css";

const CategoryLayout = ({ title, categories }) => {
  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{title}</h1>
        <p>Explore our wide range of {title.toLowerCase()} products</p>
      </div>
      
      <div className="category-sections">
        {categories.map((section, index) => (
          <div key={index} className="category-section">
            <h2 className="section-title">{section.name}</h2>
            <div className="subcategories">
              {section.subcategories.map((subcategory, subIndex) => (
                <div key={subIndex} className="subcategory-item">
                  <span className="subcategory-name">{subcategory}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLayout;