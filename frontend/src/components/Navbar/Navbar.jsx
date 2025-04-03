import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const Navbar = ({ setShowLogin, setActiveSection, activeSection }) => {
  const { getTotalCartAmount, token, setToken, food_list, logoUrl } = useContext(StoreContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const results = food_list.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear results when search term is empty
    }
  };

  const handleMobileLinkClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false); // Close menu after clicking a link
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='navbar'>
      {/* Logo */}
      <a
        href='#'
        onClick={(e) => {
          e.preventDefault(); // Prevent jump
          handleMobileLinkClick("home"); // Use handler to also close menu
        }}
        className={`navbar-logo-link ${activeSection === "home" ? "active" : ""}`} // Added class for potential targeting
      >
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="logo-image" />
        ) : (
          <span>Loading Logo...</span>
        )}
      </a>

      {/* --- Mobile Menu Toggle Button --- */}
      {/* This button is only displayed on small screens via CSS */}
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {/* Simple text or use an icon font/SVG */}
        ☰
      </button>

      {/* Main Menu UL - Add 'open' class when mobile menu is active */}
      {/* We also add 'has-mobile-controls' for CSS targeting */}
      <ul className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''} has-mobile-controls`}>

        {/* --- Links to be toggled on mobile --- */}
        {/* Added 'main-nav-link' class for CSS targeting */}
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            handleMobileLinkClick(activeSection === "menu" ? "home" : "menu");
          }}
          className={`main-nav-link ${activeSection === "menu" ? "active" : ""}`}
        >
          Бүтээгдэхүүн
        </a>

        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            handleMobileLinkClick("contact-us");
          }}
          className={`main-nav-link ${activeSection === "contact-us" ? "active" : ""}`}
        >
          Холбоо барих
        </a>

        {/* --- Search Container --- */}
        {/* This LI will be positioned differently on mobile via CSS */}
        <li className="search-container">
          <input
            type="text"
            className='search'
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(item => (
                
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                />
              ))}
            </div>
          )}
        </li>
      </ul>

      {/* Right side elements remain unchanged */}
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;