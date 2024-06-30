import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddPromotion.css";

function AddPromotion({ onAddPromotion }) {
  const [promotionName, setPromotionName] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/product/getInfoProductsDetail"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(new Set(products.map((product) => product.ProductCategoryName)));

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.ProductCategoryName === selectedCategory)
    : products;

  useEffect(() => {
    setSelectedProducts([]); // Reset selectedProducts when selectedCategory changes
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promotionData = {
      promotionName,
      description,
      discountPercentage: parseInt(discountPercentage, 10), // Ensure it's a number
      startDate,
      endDate,
      products: selectedProducts,
    };
  
   
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/promotion/addPromotion",
        promotionData,
        { headers: { "Content-Type": "application/json" } }
      );
    
      onAddPromotion(response.data); // Notify parent component of new promotion
    } catch (error) {
      console.error("Error adding promotion:", error.response?.data || error.message); // Improved error logging
    }
  };
  

  const handleProductSelection = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]); // Reset if all are already selected
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.ProductID));
    }
  };

  const toggleProductSelection = (productId) => {
    handleProductSelection(productId);
  };

  return (
    <div className="add-promotion-container">
      <PromotionForm
        promotionName={promotionName}
        setPromotionName={setPromotionName}
        description={description}
        setDescription={setDescription}
        discountPercentage={discountPercentage}
        setDiscountPercentage={setDiscountPercentage}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleSubmit={handleSubmit}
      />
      <div className="product-list-container">
        <h3>Select Products for Promotion</h3>
        <div className="filter-container-promotion">
          <label>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <ProductList
          products={filteredProducts}
          selectedProducts={selectedProducts}
          handleProductSelection={handleProductSelection}
          handleSelectAll={handleSelectAll}
          toggleProductSelection={toggleProductSelection}
        />
      </div>
    </div>
  );
}

function PromotionForm({
  promotionName,
  setPromotionName,
  description,
  setDescription,
  discountPercentage,
  setDiscountPercentage,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSubmit,
}) {
  return (
    <div className="promotion-form-container">

      <h2>Add Promotion</h2>
      <form onSubmit={handleSubmit}>
        <div className="promo-form">
          <div className="promo-half">
            <div>
              <label>Tên khuyến mãi:</label>
              <input
                type="text"
                value={promotionName}
                onChange={(e) => setPromotionName(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Phần trăm khuyến mãi:</label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Mô tả:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="promo-half">
            <div>
              <label>Ngày bắt đầu:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Ngày kết thúc:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <button type="submit">Lưu</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ProductList({ products, selectedProducts, handleProductSelection, handleSelectAll, toggleProductSelection }) {
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const handleImageClick = (productId) => {
    toggleProductSelection(productId);
  };

  return (
    <div className="product-list-container-tri">
      <div className="select-all-container-tri">
        <label>Chọn tất cả</label>
        <input
          type="checkbox"
          checked={selectedProducts.length === products.length}
          onChange={handleSelectAll}
        />
      </div>
      <div className="product-list-promotion ">
        {products.map((product) => (
          <div key={product.ProductID} className="product-item-promotion-nhan">
            <label className="product-clickable">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.ProductID)}
                onChange={() => handleProductSelection(product.ProductID)}
              />
              <div className="product-details">
                <img
                  src={product.Image}
                  alt={product.ProductName}
                  onClick={() => handleImageClick(product.ProductID)}
                  className={selectedProducts.includes(product.ProductID) ? "selected" : ""}
                />
                <div>
                  <p>{product.ProductName}</p>
                  <p>{formatPrice(product.Price)}</p>
                  <p><strong>Kho:</strong> {product.StockQuantity}</p>
                  <p><strong>HSD:</strong> {new Date(product.ExpirationDate).toLocaleDateString()}</p>
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddPromotion;
