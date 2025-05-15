// import React, { useState } from "react";

// const CustomerFeedbackForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted feedback:", formData);
   
//     alert("Feedback submitted successfully!");
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-12 mb-10">
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Feedback</h2>
//       <p className="text-gray-600 mb-6">
//         Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
//         consequat duis enim velit mollit.
//       </p>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1 text-sm">
//             Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="name"
//             required
//             placeholder="Enter your full name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1 text-sm">
//             Email <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             required
//             placeholder="Enter your email address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1 text-sm">Message</label>
//           <textarea
//             name="message"
//             rows="4"
//             placeholder="Write your message..."
//             value={formData.message}
//             onChange={handleChange}
//             className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Submit Feedback
//         </button>
//       </form>
//       <p className="text-xs text-gray-400 mt-4 text-right">
//         Powered by <span className="font-semibold">OpnForm</span>
//       </p>
//     </div>
//   );
// };

// export default CustomerFeedbackForm;
 
import React, { useState } from "react";

// Sample feedbacks
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
  // Add more if needed
];

// Feedback Card component
const FeedbackCard = ({ feedback }) => (
//   <div className="bg-red-300  shadow-md rounded-xl p-8">
//     <div className="flex gap-4 items-start">
//         <div>,,</div>
//       <img
//         src={feedback.image || "https://via.placeholder.com/60"}
//         alt={feedback.name}
//         className="w-14 h-14 rounded-full object-cover"
//       />
//       <div>
//         <p className="font-semibold text-gray-800">{feedback.name}</p>
//         <p className="text-sm text-gray-600">{feedback.review}</p>
//         <p className="text-yellow-500 text-sm mt-1">⭐ {feedback.rating}/5</p>
//       </div>
//     </div>
//   </div>
 <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between max-w-xs mx-auto">
      <div>
       
        <div className="flex justify-between items-start mb-2">
          <div className="text-yellow-500 text-lg">
            {'★'.repeat(Math.floor(feedback.rating)) + (feedback.rating % 1 !== 0 ? '' : '')}
          </div>
          <div className="text-2xl text-blue-900 font-bold">”</div>
        </div>

        
        <p className="text-gray-700 text-sm">{feedback.review}</p>
      </div>

     
      <div className="mt-6 bg-yellow-50 rounded-b-xl flex items-center gap-3 px-4 py-2">
        <img
          src={feedback.image || "https://via.placeholder.com/60"}
          alt={feedback.name}
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />
        <p className="text-orange-500 font-semibold">{feedback.name}</p>
      </div>
    </div>
);

// Feedback Form Modal (already present)
const FeedbackPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    alert("Feedback submitted successfully!");
    onClose(); // Close after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative flex flex-col md:flex-row gap-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-red-600">
          ×
        </button>

        {/* Left Panel */}
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

        {/* Right Panel - Form */}
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

// Feedback Page with Pagination
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
    <div className="w-full h-auto  mx-auto px-4 py-10 ">
      <div className=" flex justify-between px-[4rem]">
        <div className="text-2xl ">Customer feedback</div>
      <div className="text-center mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-semibold"
        >
          Add Feedback
        </button>
      </div>
      </div>

      {showForm && <FeedbackPopup onClose={() => setShowForm(false)} />}

      {/* Feedback Cards */}
      <div className="flex flex-row p-4  gap-6">
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


