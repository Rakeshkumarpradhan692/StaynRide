import React, { useEffect, useState } from "react";
import img1 from "../Components/Photo/Hotel.avif";
import img2 from "../Components/Photo/taxi.webp";
import img3 from "../Components/Photo/book.avif";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [img1, img2, img3];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden ">
     
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

   

     
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-20"
      >
        <FaChevronLeft size={20} />
      </button>

   
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-20"
      >
        <FaChevronRight size={20} />
      </button>

      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
