import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../context/authContext'
import { Mail, Phone, MapPin, User, Calendar, Edit } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { Auth } = useContext(AuthContext);
  useEffect(() => {
    setUser(Auth.user);
    console.log(Auth.user);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-white flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
          <button
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md transition"
            onClick={() => alert("Edit Profile coming soon...")}
          >
            <Edit size={18} /> Edit
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && user && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <img
                src="https://api.dicebear.com/8.x/initials/svg?seed=Ashish" 
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-4 border-indigo-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <User className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-lg font-semibold text-gray-800">{user.number}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base font-medium text-gray-800">
                  {user.city}, {user.district}, {user.state}, {user.country}
                </p>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {user.address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-base font-medium text-gray-800">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition duration-300 mt-4"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from '../context/authContext';
// import { 
//   Mail, Phone, MapPin, User, Calendar, Edit, 
//   CreditCard, Hotel, Clock, Star, Settings, LogOut 
// } from "lucide-react";

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("current");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { Auth } = useContext(AuthContext);

//   // Mock data for bookings
//   const [bookings, setBookings] = useState({
//     current: [
//       {
//         id: 1,
//         hotel: "Grand Hyatt Mumbai",
//         checkIn: "2023-12-15",
//         checkOut: "2023-12-20",
//         rooms: 2,
//         guests: 4,
//         price: 45000,
//         status: "confirmed",
//         image: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
//       }
//     ],
//     past: [
//       {
//         id: 2,
//         hotel: "Taj Lands End",
//         checkIn: "2023-08-10",
//         checkOut: "2023-08-15",
//         rooms: 1,
//         guests: 2,
//         price: 32000,
//         status: "completed",
//         image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
//       },
//       {
//         id: 3,
//         hotel: "The Oberoi Udaivilas",
//         checkIn: "2023-05-20",
//         checkOut: "2023-05-25",
//         rooms: 1,
//         guests: 2,
//         price: 65000,
//         status: "completed",
//         image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791"
//       }
//     ]
//   });

//   const [preferences, setPreferences] = useState({
//     roomType: "Deluxe",
//     smoking: false,
//     breakfast: true,
//     notifications: true
//   });

//   useEffect(() => {
//     setUser(Auth.user);
//   }, [Auth]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return null;
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
//   };

//   const cancelBooking = (bookingId) => {
//     // In a real app, this would call an API
//     setBookings(prev => ({
//       ...prev,
//       current: prev.current.filter(booking => booking.id !== bookingId)
//     }));
//     alert("Booking cancelled successfully");
//   };

//   const togglePreference = (pref) => {
//     setPreferences(prev => ({
//       ...prev,
//       [pref]: !prev[pref]
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Sidebar */}
//           <div className="w-full md:w-1/3 lg:w-1/4">
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//               <div className="p-6 text-center">
//                 <img
//                   src="https://api.dicebear.com/8.x/initials/svg?seed=Ashish" 
//                   alt="User Avatar"
//                   className="w-24 h-24 rounded-full border-4 border-indigo-300 mx-auto mb-4"
//                 />
//                 <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
//                 <p className="text-gray-600">{user?.email}</p>
//                 <p className="text-sm text-gray-500 mt-1">Member since {formatDate(user?.createdAt)}</p>
                
//                 <div className="mt-6 space-y-4">
//                   <button
//                     className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === "current" ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
//                     onClick={() => setActiveTab("current")}
//                   >
//                     <Hotel size={18} />
//                     Current Bookings
//                   </button>
//                   <button
//                     className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === "history" ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
//                     onClick={() => setActiveTab("history")}
//                   >
//                     <Clock size={18} />
//                     Booking History
//                   </button>
//                   <button
//                     className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === "preferences" ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
//                     onClick={() => setActiveTab("preferences")}
//                   >
//                     <Settings size={18} />
//                     Preferences
//                   </button>
//                   <button
//                     className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === "profile" ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
//                     onClick={() => setActiveTab("profile")}
//                   >
//                     <User size={18} />
//                     Profile Info
//                   </button>
//                 </div>
                
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center justify-center gap-2 mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Main Content */}
//           <div className="w-full md:w-2/3 lg:w-3/4">
//             {activeTab === "profile" && (
//               <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
//                     <button
//                       className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md transition"
//                       onClick={() => alert("Edit Profile coming soon...")}
//                     >
//                       <Edit size={18} /> Edit
//                     </button>
//                   </div>
                  
//                   <div className="space-y-4">
//                     <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
//                       <User className="text-indigo-500 mt-1" />
//                       <div>
//                         <p className="text-sm text-gray-500">Full Name</p>
//                         <p className="text-lg font-semibold text-gray-800">{user?.name}</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
//                       <Mail className="text-indigo-500 mt-1" />
//                       <div>
//                         <p className="text-sm text-gray-500">Email Address</p>
//                         <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
//                       <Phone className="text-indigo-500 mt-1" />
//                       <div>
//                         <p className="text-sm text-gray-500">Phone Number</p>
//                         <p className="text-lg font-semibold text-gray-800">{user?.number}</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
//                       <MapPin className="text-indigo-500 mt-1" />
//                       <div>
//                         <p className="text-sm text-gray-500">Address</p>
//                         <p className="text-base font-medium text-gray-800">
//                           {user?.address}, {user?.city}, {user?.district}, {user?.state}, {user?.country}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {activeTab === "current" && (
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Bookings</h2>
                
//                 {bookings.current.length === 0 ? (
//                   <div className="bg-white rounded-xl shadow-md p-6 text-center">
//                     <p className="text-gray-600">You don't have any current bookings</p>
//                     <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
//                       Book a Hotel Now
//                     </button>
//                   </div>
//                 ) : (
//                   bookings.current.map(booking => (
//                     <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden">
//                       <div className="md:flex">
//                         <div className="md:w-1/3">
//                           <img 
//                             className="h-full w-full object-cover" 
//                             src={booking.image} 
//                             alt={booking.hotel} 
//                           />
//                         </div>
//                         <div className="p-6 md:w-2/3">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="text-xl font-bold text-gray-800">{booking.hotel}</h3>
//                               <p className="text-green-600 font-medium">{booking.status}</p>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-gray-500">Total</p>
//                               <p className="text-xl font-bold">₹{booking.price.toLocaleString()}</p>
//                             </div>
//                           </div>
                          
//                           <div className="mt-4 grid grid-cols-2 gap-4">
//                             <div>
//                               <p className="text-sm text-gray-500">Check-in</p>
//                               <p className="font-medium">{formatDate(booking.checkIn)}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Check-out</p>
//                               <p className="font-medium">{formatDate(booking.checkOut)}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Rooms</p>
//                               <p className="font-medium">{booking.rooms}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Guests</p>
//                               <p className="font-medium">{booking.guests}</p>
//                             </div>
//                           </div>
                          
//                           <div className="mt-6 flex flex-wrap gap-3">
//                             <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg">
//                               View Details
//                             </button>
//                             <button 
//                               className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
//                               onClick={() => cancelBooking(booking.id)}
//                             >
//                               Cancel Booking
//                             </button>
//                             <button className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg">
//                               Contact Hotel
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
            
//             {activeTab === "history" && (
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking History</h2>
                
//                 {bookings.past.length === 0 ? (
//                   <div className="bg-white rounded-xl shadow-md p-6 text-center">
//                     <p className="text-gray-600">You don't have any past bookings</p>
//                   </div>
//                 ) : (
//                   bookings.past.map(booking => (
//                     <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden">
//                       <div className="md:flex">
//                         <div className="md:w-1/3">
//                           <img 
//                             className="h-full w-full object-cover" 
//                             src={booking.image} 
//                             alt={booking.hotel} 
//                           />
//                         </div>
//                         <div className="p-6 md:w-2/3">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="text-xl font-bold text-gray-800">{booking.hotel}</h3>
//                               <p className="text-blue-600 font-medium">{booking.status}</p>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-gray-500">Total</p>
//                               <p className="text-xl font-bold">₹{booking.price.toLocaleString()}</p>
//                             </div>
//                           </div>
                          
//                           <div className="mt-4 grid grid-cols-2 gap-4">
//                             <div>
//                               <p className="text-sm text-gray-500">Check-in</p>
//                               <p className="font-medium">{formatDate(booking.checkIn)}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Check-out</p>
//                               <p className="font-medium">{formatDate(booking.checkOut)}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Rooms</p>
//                               <p className="font-medium">{booking.rooms}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Guests</p>
//                               <p className="font-medium">{booking.guests}</p>
//                             </div>
//                           </div>
                          
//                           <div className="mt-6 flex flex-wrap gap-3">
//                             <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg">
//                               View Invoice
//                             </button>
//                             <button className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg">
//                               Write a Review
//                             </button>
//                             <button className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-lg">
//                               Book Again
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
            
//             {activeTab === "preferences" && (
//               <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                 <div className="p-6">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-6">Travel Preferences</h2>
                  
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3">Room Preferences</h3>
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                           <div>
//                             <p className="font-medium">Room Type</p>
//                             <p className="text-sm text-gray-500">Preferred room category</p>
//                           </div>
//                           <select 
//                             className="border border-gray-300 rounded-md px-3 py-1"
//                             value={preferences.roomType}
//                             onChange={(e) => setPreferences({...preferences, roomType: e.target.value})}
//                           >
//                             <option value="Standard">Standard</option>
//                             <option value="Deluxe">Deluxe</option>
//                             <option value="Suite">Suite</option>
//                           </select>
//                         </div>
                        
//                         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                           <div>
//                             <p className="font-medium">Breakfast Included</p>
//                             <p className="text-sm text-gray-500">Prefer rooms with breakfast</p>
//                           </div>
//                           <label className="relative inline-flex items-center cursor-pointer">
//                             <input 
//                               type="checkbox" 
//                               className="sr-only peer" 
//                               checked={preferences.breakfast}
//                               onChange={() => togglePreference("breakfast")}
//                             />
//                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
//                           </label>
//                         </div>
                        
//                         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                           <div>
//                             <p className="font-medium">Smoking Room</p>
//                             <p className="text-sm text-gray-500">Prefer smoking rooms</p>
//                           </div>
//                           <label className="relative inline-flex items-center cursor-pointer">
//                             <input 
//                               type="checkbox" 
//                               className="sr-only peer" 
//                               checked={preferences.smoking}
//                               onChange={() => togglePreference("smoking")}
//                             />
//                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
//                           </label>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3">Notification Preferences</h3>
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                           <div>
//                             <p className="font-medium">Email Notifications</p>
//                             <p className="text-sm text-gray-500">Receive booking confirmations and offers</p>
//                           </div>
//                           <label className="relative inline-flex items-center cursor-pointer">
//                             <input 
//                               type="checkbox" 
//                               className="sr-only peer" 
//                               checked={preferences.notifications}
//                               onChange={() => togglePreference("notifications")}
//                             />
//                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
//                           </label>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h3 className="text-lg font-semibold mb-3">Payment Methods</h3>
//                       <div className="p-3 bg-gray-50 rounded-lg">
//                         <div className="flex items-center gap-3">
//                           <CreditCard className="text-indigo-500" />
//                           <p className="font-medium">Credit/Debit Card</p>
//                         </div>
//                         <button className="mt-4 text-indigo-500 hover:text-indigo-700 text-sm font-medium">
//                           + Add Payment Method
//                         </button>
//                       </div>
//                     </div>
                    
//                     <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg">
//                       Save Preferences
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


