import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import './FoodDetail.css';

const FoodDetail = () => {
  const { food_list, url } = useContext(StoreContext);
  const { foodId } = useParams();
  const navigate = useNavigate();

  const [relatedItems, setRelatedItems] = useState([]);
  const [bestsellerItems, setBestsellerItems] = useState([]);

  const foodItem = food_list.find(item => String(item.id) === foodId);

  useEffect(() => {
    if (foodItem && food_list.length > 0) {
            // 1. Filter items by the same category, excluding the current item
            const sameCategoryItems = food_list.filter(
                item => item.category === foodItem.category && String(item.id) !== foodId
            );

            // 2. Shuffle the filtered list
            const shuffledItems = [...sameCategoryItems].sort(() => 0.5 - Math.random());

            // 3. Select the first 2 items (or fewer if not enough)
            setRelatedItems(shuffledItems.slice(0, 2));
        } else {
            setRelatedItems([]); // Reset if foodItem or food_list is not available
        }
    }, [foodItem, food_list, foodId]); // Dependencies: run when these change

  useEffect(() => {
      if (food_list && food_list.length > 0) {
          const shuffled = [...food_list].sort(() => 0.5 - Math.random());
          // Ensure we don't take more items than available, especially if food_list < 5
          setBestsellerItems(shuffled.slice(0, Math.min(5, food_list.length)));
      } else {
          setBestsellerItems([]);
      }
  }, [food_list]);

    // Handle loading/not found states
    if (!food_list || food_list.length === 0) {
        return <div>Жагсаалт ачааллаж байна эсвэл хоосон байна...</div>; // Loading or empty list
    }
    if (!foodItem) {
        return <div>'{foodId}' ID-тай бараа олдсонгүй.</div>; // Item not found
    }

    // Function to handle navigation to related item detail page
    const handleNavigate = (itemId) => {
        // Use navigate to change the route
        navigate(`/food/${itemId}`);
        // Optional: Scroll to top if needed after navigation
        window.scrollTo(0, 0);
    };

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

      <div className='fromcate'>
        <div className="product-images-section bl">
          <h1 className="product-title psa">{foodItem.name}</h1>
          <div className="main-image-container">
            <img
              src={url + "/images/" + foodItem.image}
              alt={foodItem.name}
              className="main-product-image"
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-info-section">
          <div className="product-header">
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
            <h2 className="product-model">Төрөл: {foodItem.category}</h2>
            <h2 className="product-model">Бүтээл: {foodItem.code}</h2>
            <hr />
            <h2 className="product-model">Товч тайлбар:</h2>
            <div className="spec-row descr">
              <div className="spec-value tlbv">
                {foodItem.description.split(',').map((line, index) => (
                  <React.Fragment key={index}>
                    {line.trim()}
                    {index < foodItem.description.split(',').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <hr />
            <div className='product-pri'>
                Үнэ: {foodItem.price}
            </div>
          </div>
        </div>
      </div>
      <div className='psadw'>
        {foodItem.category}
      </div>
                <div className='same-kind-container'>
                    <div className='same-kind-items'>
                        {relatedItems.map((item) => (
                            <div key={item.id} className='same-kind-card'>
                                <div className='same-kind-image-container'>
                                    {/* Placeholder or actual image */}
                                    <img
                                        src={url + "/images/" + item.image}
                                        alt={item.name}
                                        className='same-kind-image'
                                    />
                                </div>
                                <div className='same-kind-info'>
                                    <span className='same-kind-category'>{item.category}</span>
                                    <h3 className='same-kind-name'>{item.name}</h3>
                                    {/* Show a snippet of the description */}
                                    <p className='same-kind-description'>
                                        {item.description.split(',')[0].substring(0, 50)}{item.description.length > 50 ? '...' : ''}
                                    </p>
                                    {/* Add icons/details if needed, similar to example */}
                                    {/* <div className='same-kind-details'>
                                        <span>🕒 22h...</span>
                                        <span>📚 64 Lessons</span>
                                        <span>📊 Progress</span>
                                    </div> */}
                                    <button
                                        className='same-kind-button'
                                        onClick={() => handleNavigate(item.id)} // Use handler
                                    >
                                        Дэлгэрэнгүй 
                                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {bestsellerItems.length > 0 && ( // Only render if items are selected
                 <div className='bestseller-container'>
                     <div className="bestseller-header">
                         {/* Optional: Titles based on image */}
                         <h4>Featured Products</h4>
                         <h2>BESTSELLER PRODUCTS</h2>
                         <p>Манай дэлгүүрийн хамгийн эрэлттэй бараанууд</p> {/* Adjusted text */}
                     </div>
                     <div className='bestseller-grid'>
                         {bestsellerItems.map((item) => (
                             <FoodItem
                                 key={item.id}
                                 id={item.id}
                                 name={item.name}
                                 description={item.description.split(',')[0].substring(0,50)}
                                 price={item.price}
                                 image={item.image}
                             />
                         ))}
                     </div>
                      {/* Button is excluded as requested */}
                 </div>
        )}
    </div>
  );
};

export default FoodDetail;