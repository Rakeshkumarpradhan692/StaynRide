import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaPlus, FaPhone, FaEnvelope } from "react-icons/fa";
import logoone from '../Components/Photo/logoone.png';

const feedbackData = [
  {
    name: "Preeti Thakur",
    review: "Best braham ever had ..go for it guys ... cheapest trip ever had ...best one",
    rating: 4.5,
    image: "/path/to/preeti.jpg",
  },
  {
    name: "Bipin Bisht",
    review: "The best trip planner you can get. They have in and out knowledge...",
    rating: 4.5,
    image: "/path/to/bipin.jpg",
  },
  {
    name: "Deeefreak",
    review: "Visit many places with the help of this planner...",
    rating: 4.5,
    image: "/path/to/deeefreak.jpg",
  },
  {
    name: "Ranjeet Kumar",
    review: "Booked Manali package from Weekend Bhraman...",
    rating: 4.5,
    image: "/path/to/ranjeet.jpg",
  },
  {
    name: "New User",
    review: "Amazing service and support!",
    rating: 4.0,
    image: "",
  },
];

const FeedbackCard = ({ feedback }) => (
  <motion.div 
    className="p-2 w-full"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="bg-white shadow-lg rounded-xl overflow-hidden h-full flex flex-col border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={i < Math.floor(feedback.rating) ? "fill-current" : "text-gray-300"} 
              />
            ))}
          </div>
          <FaQuoteLeft className="text-blue-100 text-3xl" />
        </div>
        <p className="text-gray-600 mb-6">{feedback.review}</p>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 flex items-center gap-4">
        <div className="relative">
          <img
            src={logoone || "https://via.placeholder.com/60"}
            alt={feedback.name}
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-blue-800">{feedback.name}</h4>
          <p className="text-xs text-blue-600">Verified Customer</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const FeedbackPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    alert("Feedback submitted successfully!");
    onClose();
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white  w-[60%]  rounded-xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="flex flex-col md:flex-row ">
          <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold">WHY IS YOUR FEEDBACK IMPORTANT TO US</h3>
              <button 
                onClick={onClose} 
                className="text-white hover:text-blue-200 text-2xl"
              >
                &times;
              </button>
            </div>
            <p className="mb-6">
              At Bharat Booking Holidays, we value and consider our guests as our top-most priority...
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Your feedback can be a suggestion, compliment, or complaint</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Your suggestion helps us improve our services</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Your compliment boosts our workforce morale</span>
              </li>
            </ul>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaPhone className="mr-2 text-blue-300" />
                <span>91-9805063636</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-300" />
                <span>help@bharatbooking.com</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <h4 className="text-xl font-bold text-gray-800 mb-6">Feedback Form</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email ID"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo (Optional)</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea
                  name="message"
                  placeholder="Your additional feedback here"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-md transition-all"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeedbackPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(feedbackData.length / itemsPerPage);

  const currentFeedbacks = feedbackData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-50 py-6  px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <motion.div 
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Customer <span className="text-blue-600">Testimonials</span>
              </h2>
              <p className="text-gray-600">Hear what our customers say about their experiences</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-semibold whitespace-nowrap"
            >
              <FaPlus className="text-sm" />
              Add Your Feedback
            </motion.button>
          </div>
        </motion.div>

        {showForm && <FeedbackPopup onClose={() => setShowForm(false)} />}

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentFeedbacks.map((fb, i) => (
            <FeedbackCard key={i} feedback={fb} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 text-sm font-medium border border-gray-300 ${
                    currentPage === i + 1 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } ${i === 0 ? "rounded-l-lg" : ""} ${
                    i === totalPages - 1 ? "rounded-r-lg" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;