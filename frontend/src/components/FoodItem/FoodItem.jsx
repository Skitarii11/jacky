import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, displayMode = 'default' }) => {
  const { url } = useContext(StoreContext);

  const handleItemClick = () => {
    window.open(`/food/${id}`, '_blank', 'noopener,noreferrer'); // Open in new tab
  };

  return (
    <div
      className="food-item"
      onClick={handleItemClick}
    >
      <div className="food-item-img-container">
        <img className="food-item-image" src={url + "/images/" + image} alt="" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        {displayMode === 'recommend' ? (
           // For recommend section, just show "Learn More" link styling
           <div className="food-item-learn-more" onClick={handleItemClick} style={{color: '#3f3e3e', fontWeight: 'bold'}}>
               Learn More
           </div>
        ) : (
          // Default display with description and price
          <>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodItem;