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
          <h2 className="product-model">{foodItem.category}</h2>
          <div className="spec-row descr">
            <div className="spec-value tlbv">
              {foodItem.description.split(',').map((line, index) => (
                <React.Fragment key={index}>
                  {line.trim()}
                  {index < foodItem.description.split(',').length - 1 && <br />}
                </React.Fragment>
              ))}</div>
          </div>
          <h2 className="product-model">Түрэлт: {foodItem.turelt}</h2>
          <h2 className="product-model">Бүтээл: {foodItem.code}</h2>
          <h2 className="product-model">Шахах шингэний температур: {foodItem.dimension}</h2>
        </div>

        <div className="product-specs">
          <div className="spec-label">Техникийн үзүүлэлт</div>
          <div className="spec-row">
            <div className="spec-label">Цахилгаан хүчдэл:</div>
            <div className="spec-value">
              {foodItem.use}
            </div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Хүчдлийн зөвшөөрөгдөх хазайлт:</div>
            <div className="spec-value">
              {foodItem.specialty}
            </div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Чадал P2:</div>
            <div className="spec-value">
              {foodItem.pack}
            </div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Моторын АҮК ангилал:</div>
            <div className="spec-value">{foodItem.model_detail}</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Хөдөлгүүрийн асаалт:</div>
            <div className="spec-value">{foodItem.asaalt}</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Гүйдлийн хүч IN:</div>
            <div className="spec-value">{foodItem.guidel}</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Хөдөлгүүрийн хурд n:</div>
            <div className="spec-value">{foodItem.hurd}</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Чадлын фактор cos φ100:</div>
            <div className="spec-value">{foodItem.chadal}</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Моторын АҮК 75% ηM 75%:</div>
            <div className="spec-value">{foodItem.motor75}</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Моторын АҮК 100% ηM 100%:</div>
            <div className="spec-value">{foodItem.motor100}</div>
          </div>
          {/* Add more spec rows as needed */}
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;