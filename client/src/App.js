// import React from 'react';
// import { Route, Routes } from 'react-router-dom'

// import LoginPage from './Components/LoginPage';
// import RegisterPage from './Components/RegisterPage';
// import HotelsPage from './Components/HotelsPage'
// import Home from './Components/Home';
// import About from './Components/About';
// import Contact from './Components/Contact';
// import CabsPage from './Components/CabsPage'
// import HotelDetails from './Components/HotelDetails';
// // import Navbar from './Components/Navbar';
// // import DashboardPage from './Components/Dashboard';
// import PrivateRoute from './Components/PrivateRoute';
// import PublicRoute from './Components/PublicRoute';
// function App() {
//   return (
//     <div>
//        {/* <Navbar/> */}
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path="/hotels" element={<HotelsPage />} />
//         <Route path="/Cabs" element={<CabsPage />} />
//         <Route path='/About' element={<About/>}/>
//         <Route path='/Contact' element={<Contact/>}/>
//         <Route path="/login" element={<LoginPage />} />
//         {/* <Route path="/register" element={<RegisterPage />} /> */}
//         <Route path="/hotels/:id" element={<HotelDetails />} />
//          <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               {/* <DashboardPage /> */}
//             </PrivateRoute>
//           }
//         />
//         <Route
//   path="/register"
//   element={
//     <PublicRoute>
//       <RegisterPage />
//     </PublicRoute>
//   }
// />
//       </Routes>
//     </div>
      
    
//   );
// }

// export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import HotelsPage from './Components/HotelsPage';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import CabsPage from './Components/CabsPage';
import HotelDetails from './Components/HotelDetails';
// import Navbar from './Components/Navbar';
// import DashboardPage from './Components/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute'; // ✅ Add this import
import CabDetail from './Components/CabDetails';

function App() {
  return (
    <div>
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<HotelsPage />} />
        <Route path='/cabs' element={<CabsPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<LoginPage />} />
         <Route path="/cabs/:id" element={<CabDetail />} />
       
        <Route
          path='/register'
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route path='/hotels/:id' element={<HotelDetails />} />

        
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
