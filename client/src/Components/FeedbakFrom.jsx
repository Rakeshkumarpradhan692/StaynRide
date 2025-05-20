import React, { useState } from "react";
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
  <div className="p-4 w-full">
    <div className="bg-slate-200 shadow-md rounded-xl p-6 flex flex-col justify-between h-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="text-yellow-500 text-lg md:text-xl">
            {'★'.repeat(Math.floor(feedback.rating))}
          </div>
          <div className="text-2xl md:text-3xl text-blue-900 font-bold">”</div>
        </div>
        <p className="text-gray-700 text-base md:text-lg">{feedback.review}</p>
      </div>
      <div className="mt-6 bg-yellow-50 rounded-b-xl flex flex-col sm:flex-row justify-start sm:justify-around items-center gap-3 px-4 py-2">
        <img
          src={logoone || "https://via.placeholder.com/60"}
          alt={feedback.name}
          className="w-12 h-12 rounded-full border-2 border-white shadow-md"
        />
        <p className="text-orange-500 font-semibold text-sm md:text-base">{feedback.name}</p>
      </div>
    </div>
  </div>
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto px-4 py-6">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative flex flex-col md:flex-row gap-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-red-600">
          ×
        </button>
        <div className="md:w-1/2 text-left">
          <h3 className="text-lg font-bold mb-2">WHY IS YOUR FEEDBACK IMPORTANT TO US</h3>
          <p className="text-sm mb-2">
            At Bharat Booking Holidays, we value and consider our guests as our top-most priority...
          </p>
          <ol className="list-decimal pl-5 text-sm space-y-1">
            <li>Your feedback can be a suggestion, compliment, or complaint.</li>
            <li>Your suggestion helps us improve our services.</li>
            <li>Your compliment boosts our workforce morale.</li>
            <li>Your complaint is treated with utmost urgency.</li>
            <li>Other observations are also appreciated.</li>
          </ol>
          <p className="text-sm mt-2">
            Contact: <br />
            📞 91-9805063636 <br />
            📧 help@bharatbooking.com
          </p>
        </div>
        <div className="md:w-1/2 bg-blue-900 p-4 rounded-lg text-white">
          <h4 className="text-lg font-semibold mb-3">Feedback Form</h4>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              required
              placeholder="Enter Your Name"
              className="w-full p-2 rounded bg-blue-800 placeholder-gray-300 text-white"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email ID"
              className="w-full p-2 rounded bg-blue-800 placeholder-gray-300 text-white"
              onChange={handleChange}
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-2 bg-blue-800 text-white"
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your additional feedback here"
              className="w-full p-2 rounded bg-blue-800 text-white"
              rows={4}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
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
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white shadow-md rounded-2xl p-6 md:p-10 mb-8 border border-gray-200">
  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
    {/* Title */}
    <div className="text-3xl md:text-4xl font-serif text-blue-700 tracking-wide">
      What Our Customers Say
    </div>

    {/* Add Feedback Button */}
    <button
      onClick={() => setShowForm(true)}
      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full hover:scale-105 transform transition duration-300 shadow-lg font-semibold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      Add Feedback
    </button>
  </div>
</div>


      {showForm && <FeedbackPopup onClose={() => setShowForm(false)} />}

      {/* Feedback Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentFeedbacks.map((fb, i) => (
          <FeedbackCard key={i} feedback={fb} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? "bg-blue-700 text-white" : "bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
