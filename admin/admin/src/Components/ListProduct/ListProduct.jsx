import React, { useEffect, useState } from 'react'
import cross_icon from "../../assets/cross_icon.png"
import "./ListProduct.css"
const ListProduct = () => {
    const [all_product, setAllProducts] = useState([]);
    const fetchInfo = async () => {
        await fetch('http://localhost:8000/allproducts')
        .then((res)=> res.json())
        .then((data) => { setAllProducts(data)})
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const remove_product = async (id) => {
        try {
            await fetch('http://localhost:8000/removeproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id })
            });
            await fetchInfo(); // Refresh data after deletion
        } catch (error) {
            console.error("Error removing product:", error);
        }
    }
    


  return (
    <div className='list-product'>
        <h1>All Product List</h1>
        <div className="listproduct-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
            <hr />
            {all_product.map((Product, index) => {
                return <> <div key={index}className="listproduct-format-main listproduct-format">
                  <img src={Product.image} alt="" className="listproduct-product-icon" />
                  <p>{Product.name}</p>
                  <p>₹{Product.old_price}</p>
                  <p>₹{Product.new_price}</p>
                  <p>{Product.category}</p>
                  <img onClick={() => remove_product(Product.id)} src={cross_icon} alt="" className="listproduct-remove-icon" />
                </div>
                <hr /></>
            })}
        </div>
    </div>
  )
}

export default ListProduct