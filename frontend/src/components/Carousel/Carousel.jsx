import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Create a Carousel.css file

const Carousel = ({ images, showButtons = true }) => {  // Add the showButtons prop
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

    useEffect(() => {
        const timer = setInterval(() => {
            goToNext();
        }, 3000);

        return () => clearInterval(timer); // Clean up on unmount
    }, []);

  return (
    <div className="carousel">
      {showButtons && (  // Conditionally render the buttons
        <button className="carousel-button carousel-button-prev" onClick={goToPrevious}>
         {'<'}
        </button>
      )}
      <div className="carousel-image-container">
        <img src={images[currentIndex]} alt={`Carousel Image ${currentIndex + 1}`} className="carousel-image" />
      </div>
      {showButtons && (  // Conditionally render the buttons
        <button className="carousel-button carousel-button-next" onClick={goToNext}>
          {'>'}
        </button>
      )}
    </div>
  );
};

export default Carousel;