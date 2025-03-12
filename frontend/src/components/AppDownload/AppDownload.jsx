import React, { useContext, useEffect, useState } from 'react';
import './AppDownload.css';
import { StoreContext } from '../../context/StoreContext';
import Carousel from '../Carousel/Carousel'; // Import the Carousel component

const AppDownload = () => {
    const { food_list, url } = useContext(StoreContext);
    const [randomImages1, setRandomImages1] = useState([]);
    const [randomImages2, setRandomImages2] = useState([]);
    const [randomImages3, setRandomImages3] = useState([]);
    const [randomImages4, setRandomImages4] = useState([]);
    const [carouselImages, setCarouselImages] = useState([]);//added statet

    useEffect(() => {
        // Function to get a subset of random images from food_list
        const getRandomImages = (count) => {
            if (!Array.isArray(food_list)) {
                return []; // Return an empty array if food_list is not an array
            }
            const shuffled = [...food_list].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count).map(item => url + "/images/" + item.image);
        };

        // Set the random images for each carousel
        setRandomImages1(getRandomImages(3)); // Adjust the count as needed
        setRandomImages2(getRandomImages(3));
        setRandomImages3(getRandomImages(3)); // Adjust the count as needed
        setRandomImages4(getRandomImages(3));// Adjust the count as needed
        if (Array.isArray(food_list)) {
            setCarouselImages(food_list.map(item => url + "/images/" + item.image));
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
        </div>
    );
};

export default AppDownload;