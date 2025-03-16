import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const FoodDetail = () => {
  const { food_list, url } = useContext(StoreContext);
  const { foodId } = useParams();

  // Find the food item based on the ID
  const foodItem = food_list.find(item => item._id === foodId);

  if (!foodItem) {
    return <div>Food item not found.</div>; // Or handle the error as you prefer
  }

  return (
    <div className="food-detail">
      <h1>{foodItem.name}</h1>
      <img src={url + "/images/" + foodItem.image} alt={foodItem.name} />
      <p>{foodItem.description}</p>
      <p>${foodItem.price}</p>
      {/* You can add more details here */}
    </div>
  );
};

export default FoodDetail;