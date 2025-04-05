import React, { useContext, useEffect, useState } from 'react';
import './AppDownload.css';
import { StoreContext } from '../../context/StoreContext';
import Carousel from '../Carousel/Carousel';
import FoodItem from '../FoodItem/FoodItem';

const AppDownload = () => {
    const { food_list = [], url } = useContext(StoreContext); // Default food_list to []
    const [randomImages1, setRandomImages1] = useState([]);
    const [randomImages2, setRandomImages2] = useState([]);
    const [randomImages3, setRandomImages3] = useState([]);
    const [randomImages4, setRandomImages4] = useState([]);

    // State for the items featured in the main carousel
    const [featuredItems, setFeaturedItems] = useState([]);
    // State to track the currently displayed item index in the main carousel
    const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

    const [recommendedItems, setRecommendedItems] = useState([]);

    useEffect(() => {
        // Ensure food_list is an array and has items before proceeding
        if (!Array.isArray(food_list) || food_list.length === 0) {
             // Reset states if food_list is not ready or empty
             setRandomImages1([]);
             setRandomImages2([]);
             setRandomImages3([]);
             setRandomImages4([]);
             setFeaturedItems([]);
             setRecommendedItems([]);
             return; // Exit early
        }

        // Function to get random image URLs for small carousels
        const getRandomImageUrls = (count) => {
            const shuffled = [...food_list].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count).map(item => `${url}/images/${item.image}`);
        };

        // Function to get random full items for featured/recommended sections
        const getRandomItems = (count) => {
            const shuffled = [...food_list].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };

        // Set images for small carousels
        setRandomImages1(getRandomImageUrls(3));
        setRandomImages2(getRandomImageUrls(3));
        setRandomImages3(getRandomImageUrls(3));
        setRandomImages4(getRandomImageUrls(3));

        // Set items for the main featured carousel (e.g., first 5 or random 5)
        setFeaturedItems(getRandomItems(5)); // Let's use 5 items

        // Set items for the 'recommend' section
        setRecommendedItems(getRandomItems(3));

    }, [food_list, url]); // Depend on food_list and url

    // Callback function for the main carousel slide change
    const handleFeaturedSlideChange = (index) => {
        setCurrentFeaturedIndex(index);
    };

    // Get the currently active featured item
    const activeFeaturedItem = featuredItems[currentFeaturedIndex];

    // Derive image URLs for the main Carousel component
    const featuredImageUrls = featuredItems.map(item => `${url}/images/${item.image}`);

    // Function to handle button click
    const handleViewDetailsClick = (itemId) => {
        if (itemId) {
            window.open(`/food/${itemId}`, '_blank', 'noopener,noreferrer');
        }
    };


    return (
        <div className='app-download' id='app-download'>
            {/* Header Section */}
            <div className='headerss'>
                <div className="header-contentss">
                    <h2>Wilo – Дэвшилтэт насосны технологи, Ухаалаг шийдэл</h2>
                </div>
            </div>
            <p>ahbsb djkabs jd bak <br /> For Easier Life</p>
            <hr />

            {/* --- New Main Carousel Section --- */}
            {featuredItems.length > 0 && activeFeaturedItem ? (
                <div className='featured-product-section'>
                    <div className='featured-carousel-container'>
                         {/* Pass image URLs and the change handler */}
                        <Carousel
                            images={featuredImageUrls}
                            onSlideChange={handleFeaturedSlideChange}
                            autoPlay={true} // Optional: enable autoPlay
                            showButtons={true} // Ensure buttons are shown
                         />
                    </div>
                    <div className='featured-info-container'>
                        <h3 className='featured-item-name'>Насос мэдээлэл</h3>
                        <p className='featured-item-price'>₮{activeFeaturedItem.price.toLocaleString()}</p> {/* Format price */}
                        <p className='featured-item-availability'>
                            Availability : <span>In Stock</span> {/* Static text for now */}
                        </p>
                        <p className='featured-item-description'>
                            {/* Show a part of the description */}
                            {activeFeaturedItem.description.split(',')[0]}
                        </p>
                        <hr className='featured-info-hr'/>
                        <button
                            className='featured-details-button'
                            onClick={() => handleViewDetailsClick(activeFeaturedItem.id)}
                        >
                            Дэлгэрэнгүй үзэх {/* Button text from example */}
                        </button>
                    </div>
                </div>
            ) : (
                // Optional: Show a loading or placeholder state
                 <div className="featured-product-section-placeholder">Loading featured product...</div>
            )}
            {/* --- End of New Main Carousel Section --- */}


            <p>For Better Experience <br /> For Easier Life</p>
            <hr />

            {/* Small Carousels Section */}
            <div className="app-download-platforms">
                {randomImages1.length > 0 && (
                    <div className="small-carousel-container">
                        <Carousel images={randomImages1} showButtons={false} autoPlay={true} interval={3500}/>
                    </div>
                )}
                {randomImages2.length > 0 && (
                     <div className="small-carousel-container">
                        <Carousel images={randomImages2} showButtons={false} autoPlay={true} interval={4000} />
                     </div>
                 )}
                {randomImages3.length > 0 && (
                     <div className="small-carousel-container">
                         <Carousel images={randomImages3} showButtons={false} autoPlay={true} interval={4500}/>
                     </div>
                 )}
                 {randomImages4.length > 0 && (
                     <div className="small-carousel-container">
                         <Carousel images={randomImages4} showButtons={false} autoPlay={true} interval={5000}/>
                     </div>
                 )}
            </div>

            {/* Recommend Section */}
            <div className='recommend'>
                {/* ... (keep existing recommend section structure) ... */}
                <h2 className='recommend-title'>Онцлох бараа</h2> {/* Changed title */}
                 <p className='recommend-subtitle'>Манай дэлгүүрт худалдаалагдаж буй онцлох бараануудтай танилцана уу.
                 </p>
                 <div className="recommend-items-container">
                     {recommendedItems.length > 0 ? (
                         recommendedItems.map((item) => (
                            <FoodItem
                                 key={item.id || item._id}
                                 id={item.id || item._id}
                                 name={item.name}
                                 description={item.description}
                                 price={item.price}
                                 image={item.image}
                                 displayMode="recommend"
                                 newTag='recommend'
                             />
                         ))
                         ) : (
                             <p>Loading recommendations...</p>
                     )}
                 </div>
            </div>
        </div>
    );
};

export default AppDownload;