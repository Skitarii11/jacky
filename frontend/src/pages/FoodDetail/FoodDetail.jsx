import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './FoodDetail.css';

const FoodDetail = () => {
  const { food_list, url } = useContext(StoreContext);
  const { foodId } = useParams();

  const foodItem = food_list.find(item => item._id === foodId);

  if (!foodItem) {
    return <div>Food item not found.</div>;
  }

  return (
    <div className="product-detail-container">
      {/* Product Images Section */}
      <div className="product-images-section">
        <h1 className="product-title">{foodItem.name}</h1>
        <div className="main-image-container">
          <img
            src={url + "/images/" + foodItem.image}
            alt={foodItem.name}
            className="main-product-image"
          />
        </div>
        <div className="thumbnail-images">
          <img
            src={url + "/images/" + foodItem.image}
            alt={foodItem.name}
            className="thumbnail-image"
          />
          <img
            src={url + "/images/" + foodItem.image}
            alt={foodItem.name}
            className="thumbnail-image"
          />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="product-info-section">
        <div className="product-header">
          <h2 className="product-model">Model: {foodItem.name}</h2>
          <div className="product-price">${foodItem.price}</div>
        </div>

        <div className="product-specs">
          <div className="spec-row">
            <div className="spec-label">Category:</div>
            <div className="spec-value">Food</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Description:</div>
            <div className="spec-value">{foodItem.description}</div>
          </div>
          {/* Add more spec rows as needed */}
        </div>

        <div className="product-options">
          <h3 className="options-title">Available Options</h3>
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" min="1" defaultValue="1" />
          </div>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;