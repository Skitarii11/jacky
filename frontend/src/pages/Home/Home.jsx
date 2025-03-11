import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import ContactForm from '../../components/ContactForm/ContactForm'

const Home = ({ activeSection }) => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      {/* Show AppDownload only when "home" is active */}
      {activeSection === "home" && <AppDownload />}

      {/* Show these components only when "menu" is active */}
      {activeSection === "menu" && (
        <>
          <Header />
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay category={category} />
        </>
      )}
      {activeSection === "contact-us" && <ContactForm />}
    </div>
  )
}

export default Home;
