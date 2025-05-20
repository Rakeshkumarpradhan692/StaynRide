import React from "react";

const HotelIntroSection = () => {
  return (
    <div className="bg-white px-8 md:px-[5rem] py-12 w-full  mx-auto">
     
      <div className="text-center mb-12">
        <h3 className="md:text-lg font-semibold text-yellow-600">HOTEL BAYVIEW</h3>
        <h1 className="md:text-5xl font-serif text-blue-900 mt-2">Relax in our Hotel Resort</h1>
      </div>

     
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <p className="text-gray-700 text-base leading-relaxed">
          Quisque eu euismod arcu. Morbi et dapibus diam, sed interdum velit.
          Proin tempor nunc vel nisl condimentum, nec tempor risus.
        </p>
        <p className="text-gray-700 text-base leading-relaxed">
          Curabitur a fringilla eros. Pellentesque eu interdum nulla.
          Pellentesque porttitor dui nec leo condimentum, et euismod mi mollis.
        </p>
      </div>

     
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <p className="text-gray-700 text-base leading-relaxed">
          Quisque eu euismod arcu. Morbi et dapibus diam, sed interdum velit.
          Proin tempor nunc vel nisl condimentum, nec tempor risus.
        </p>
        <p className="text-gray-700 text-base leading-relaxed">
          Curabitur a fringilla eros. Pellentesque eu interdum nulla.
          Pellentesque porttitor dui nec leo condimentum, et euismod mi mollis.
        </p>
      </div>

      
      <div className="grid md:grid-cols-2 items-center gap-8">
      
        <div className="flex items-center space-x-6">
          <img
            src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/03/avatar-150x150.png"
            alt="Andrew Stuart"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Andrew Stuart</h3>
            <p className="text-sm text-gray-500">Hotel Manager</p>
          </div>
        </div>

        
        <div className="flex justify-center md:justify-end">
          <img
            src="https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/hotel/wp-content/uploads/sites/2/2022/03/signature.png"
            alt="Signature"
            className="w-64 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HotelIntroSection;
