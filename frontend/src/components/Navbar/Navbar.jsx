import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const Navbar = ({ setShowLogin, setActiveSection, activeSection }) => {
  const { getTotalCartAmount, token, setToken, food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
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

  return (
    <div className='navbar'>
      {/* "Name in here" behaves like a menu link and is active initially */}
      <a
        href='#'
        onClick={(e) => {
          e.preventDefault(); // Prevent jump
          setActiveSection("home");
        }}
        className={activeSection === "home" ? "active" : ""}
      >
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="logo-image" />
        ) : (
          <span>Loading Logo...</span>  // Or a default text logo
        )}
      </a>

      <ul className="navbar-menu">
      
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault(); // Prevent jump
            setActiveSection(activeSection === "menu" ? "home" : "menu");
          }}
          className={activeSection === "menu" ? "active" : ""}
        >
          menu
        </a>

        <a
          href='#'
          onClick={(e) => {
            e.preventDefault(); // Prevent jump
            setActiveSection("contact-us");
          }}
          className={activeSection === "contact-us" ? "active" : ""}
        >
          contact us
        </a>

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
                    key={item.id}
                    id={item.id}
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