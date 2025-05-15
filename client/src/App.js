import React from 'react';
import { Route, Routes } from 'react-router-dom'

import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import HotelsPage from './Components/HotelsPage'
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import CabsPage from './Components/CabsPage'
import HotelDetails from './Components/HotelDetails';

function App() {
  return (
    <div>
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/Cabs" element={<CabsPage />} />
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Routes>
    </div>
      
    
  );
}

export default App;
