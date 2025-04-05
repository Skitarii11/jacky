import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import './Carousel.css';

// Add onSlideChange, autoPlay, interval props
const Carousel = ({ images = [], showButtons = true, autoPlay = true, interval = 3000, onSlideChange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Use useCallback to stabilize these functions, preventing unnecessary effect runs
    const goToPrevious = useCallback(() => {
        // Ensure images is an array and has length before calculating index
        if (!Array.isArray(images) || images.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }, [images]); // Dependency: images array

    const goToNext = useCallback(() => {
        // Ensure images is an array and has length
        if (!Array.isArray(images) || images.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, [images]); // Dependency: images array

    // Effect for auto-play functionality
    useEffect(() => {
        let timer;
        // Start interval only if autoPlay is true and there's more than one image
        if (autoPlay && Array.isArray(images) && images.length > 1) {
            timer = setInterval(goToNext, interval); // Use the interval prop
        }

        // Cleanup function: clear interval when component unmounts or dependencies change
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
        // Dependencies: autoPlay, interval, images array length (via goToNext), goToNext function itself
    }, [autoPlay, interval, images, goToNext]);


    // Effect to notify parent component when the slide changes
    useEffect(() => {
        // Check if onSlideChange is a function before calling it
        if (typeof onSlideChange === 'function') {
            onSlideChange(currentIndex);
        }
        // Dependencies: currentIndex and the onSlideChange callback itself
    }, [currentIndex, onSlideChange]);


    // Handle case where images might not be loaded yet or is empty
    if (!Array.isArray(images) || images.length === 0) {
        return <div className="carousel-placeholder">Loading images...</div>; // Or some placeholder
    }

    return (
        // Added a wrapper div for potentially better styling control
        <div className="carousel-wrapper">
             <div className="carousel">
                 {showButtons && images.length > 1 && ( // Show buttons only if needed and more than one image
                     <button className="carousel-button carousel-button-prev" onClick={goToPrevious}>
                         {'<'}
                     </button>
                 )}
                 <div className="carousel-image-container">
                     {/* Display the current image */}
                     <img
                         // Use a key that changes with the image src to help React differentiate
                         key={images[currentIndex]}
                         src={images[currentIndex]}
                         alt={`Slide ${currentIndex + 1}`}
                         className="carousel-image"
                     />
                 </div>
                 {showButtons && images.length > 1 && ( // Show buttons only if needed and more than one image
                     <button className="carousel-button carousel-button-next" onClick={goToNext}>
                         {'>'}
                     </button>
                 )}

                  {/* Optional: Dots indicator */}
                  {images.length > 1 && ( // Show dots only if more than one image
                     <div className="carousel-dots">
                         {images.map((_, index) => (
                             <span
                                 key={index}
                                 className={`dot ${index === currentIndex ? 'active' : ''}`}
                                 // Allow clicking dots to navigate
                                 onClick={() => setCurrentIndex(index)}
                             ></span>
                         ))}
                     </div>
                  )}
             </div>
        </div>
    );
};

export default Carousel;