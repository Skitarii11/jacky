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
          <h2 className="product-model">Нэр: {foodItem.name}</h2>
          <h2 className="product-model">Барааны дугаар: {foodItem.code}</h2>
          <h2 className="product-model">Хэмжээ: {foodItem.dimension}</h2>
          {/* <div className="product-price">${foodItem.price}</div> */}
        </div>

        <div className="product-specs">
          <div className="spec-row">
            <div className="spec-label">Төрөл:</div>
            <div className="spec-value">{foodItem.category}</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Тайлбар:</div>
            <div className="spec-value">{foodItem.description}</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Хэрэглээ:</div>
            <div className="spec-value">
              {foodItem.use.split(',').map((line, index) => (
                <React.Fragment key={index}>
                  {line.trim()}
                  {index < foodItem.specialty.split(',').length - 1 && <br />}
                </React.Fragment>
              ))}</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Онцлог, давуу талууд:</div>
            <div className="spec-value">
              {foodItem.specialty.split(',').map((line, index) => (
                <React.Fragment key={index}>
                  {line.trim()}
                  {index < foodItem.specialty.split(',').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Багцын агуулга:</div>
            <div className="spec-value">
              {foodItem.pack.split(',').map((line, index) => (
                <React.Fragment key={index}>
                  {line.trim()}
                  {index < foodItem.specialty.split(',').length - 1 && <br />}
                </React.Fragment>
              ))}</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Загварын нэмэлт мэдээлэл:</div>
            <div className="spec-value">{foodItem.model_detail}</div>
          </div>
          {/* Add more spec rows as needed */}
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;