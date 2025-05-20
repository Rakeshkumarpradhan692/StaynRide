import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const Banner = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
 
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/public/all-banners");
        const fetchedImages = response.data?.banners || []; 
        console.log(fetchedImages);
        setImages(fetchedImages);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, images]);

  const goToPrevious = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  const goToNext = () =>
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );

  if (images.length === 0) {
    return <div className="text-center py-20 text-gray-500">No banners available</div>;
  }

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden">
      <div className="relative w-full h-full">
        {images.map((banner, index) => (
          <img
            key={index}
            src={banner.image} 
            alt={banner.title || `Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

     
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-20"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={20} />
      </button>

      
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-20"
        aria-label="Next slide"
      >
        <FaChevronRight size={20} />
      </button>

      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              i === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
