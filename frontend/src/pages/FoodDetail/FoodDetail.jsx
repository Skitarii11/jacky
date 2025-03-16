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
    <div className="food-detail-container">
      <div className="left-section">
        <h1 className="food-detail-name">{foodItem.name}</h1>
        <img
          src={url + "/images/" + foodItem.image}
          alt={foodItem.name}
          className="food-detail-image"
        />
      </div>
      <div className="right-section">
        <div className="small-images">
          <img
            src={url + "/images/" + foodItem.image}
            alt={foodItem.name}
            className="food-detail-small-image"
          />
          <img
            src={url + "/images/" + foodItem.image}
            alt={foodItem.name}
            className="food-detail-small-image"
          />
        </div>
        <p className="food-detail-description">{foodItem.description}</p>
        <p className="food-detail-price">${foodItem.price}</p>
      </div>
    </div>
  );
};

export default FoodDetail;