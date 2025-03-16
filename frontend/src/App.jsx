import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import ContactForm from "./components/ContactForm/ContactForm";

import FoodDetail from './pages/FoodDetail/FoodDetail';

import Header from './components/Header/Header'
import FoodDisplay from './components/FoodDisplay/FoodDisplay'
import ExploreMenu from './components/ExploreMenu/ExploreMenu'
import AppDownload from './components/AppDownload/AppDownload'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // Initially "home"

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setActiveSection={setActiveSection} activeSection={activeSection} />
        <Routes>
          <Route path='/' element={<Home activeSection={activeSection} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path="/food/:foodId" element={<FoodDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;
