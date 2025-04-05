import React, { useContext, useEffect, useState } from 'react';
import './AppDownload.css';
import { StoreContext } from '../../context/StoreContext';
import Carousel from '../Carousel/Carousel'; // Import the Carousel component
import FoodItem from '../FoodItem/FoodItem';

const AppDownload = () => {
    const { food_list, url } = useContext(StoreContext);
    const [randomImages1, setRandomImages1] = useState([]);
    const [randomImages2, setRandomImages2] = useState([]);
    const [randomImages3, setRandomImages3] = useState([]);
    const [randomImages4, setRandomImages4] = useState([]);
    const [carouselImages, setCarouselImages] = useState([]);//added statet
    const [recommendedItems, setRecommendedItems] = useState([]);

    useEffect(() => {
        // Function to get a subset of random images from food_list
        const getRandomImages = (count) => {
            if (!Array.isArray(food_list)) {
                return []; // Return an empty array if food_list is not an array
            }
            const shuffled = [...food_list].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count).map(item => url + "/images/" + item.image);
        };
        console.log(food_list)

        // Set the random images for each carousel
        setRandomImages1(getRandomImages(3)); // Adjust the count as needed
        setRandomImages2(getRandomImages(3));
        setRandomImages3(getRandomImages(3)); // Adjust the count as needed
        setRandomImages4(getRandomImages(3));// Adjust the count as needed
        if (Array.isArray(food_list)) {
            setCarouselImages(food_list.map(item => url + "/images/" + item.image));
            const shuffled = [...food_list].sort(() => 0.5 - Math.random());
            setRecommendedItems(shuffled.slice(0, 3));
        } else {
            // Reset if food_list is empty or not an array
            setCarouselImages([]);
            setRecommendedItems([]);
        }
    }, [food_list, url]); // Depend on food_list and url so when those updated, it'll be updated as well

    return (
        <div className='app-download' id='app-download'>
            <div className='headerss'> <div className="header-contentss"> <h2>Wilo – Дэвшилтэт насосны технологи, Ухаалаг шийдэл</h2> </div> </div>
            <p>ahbsb djkabs jd bak <br />  For Easier Life</p>
            <hr />
            {Array.isArray(carouselImages) && carouselImages.length > 0 && (
                <Carousel images={carouselImages} /> // Buttons will be shown by default
            )}
            <p>For Better Experience <br />  For Easier Life</p>
            <hr />
            <div className="app-download-platforms">
                {randomImages1.length > 0 && (
                    <div className="small-carousel-container">
                        <Carousel images={randomImages1} showButtons={false} />
                    </div>
                )}
                {randomImages2.length > 0 && (
                    <div className="small-carousel-container">
                        <Carousel images={randomImages2} showButtons={false} />
                    </div>
                )}
                {randomImages3.length > 0 && (
                    <div className="small-carousel-container">
                        <Carousel images={randomImages3} showButtons={false} />
                    </div>
                )}
                {randomImages4.length > 0 && (
                    <div className="small-carousel-container">
                        <Carousel images={randomImages4} showButtons={false} />
                    </div>
                )}
            </div>
            <div className='recommend'>
                <h2 className='recommend-title'>Nasos</h2>
                <p className='recommend-subtitle'>Problems trying to resolve the conflict between <br />the two major realms of Classical physics: Newtonian mechanics
                </p>

                <div className="recommend-items-container">
                    {recommendedItems.length > 0 ? (
                        recommendedItems.map((item) => (
                            <FoodItem
                                key={item.id || item._id} // Use unique key
                                id={item.id || item._id}   // Pass the ID for the link
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