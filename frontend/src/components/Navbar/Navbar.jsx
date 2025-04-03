import React, { useContext, useState, useEffect, useRef } from 'react'; // Import useEffect, useRef
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile dropdown
  const mobileMenuRef = useRef(null); // Ref for click outside detection
  const hamburgerRef = useRef(null); // Ref for hamburger button

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

  const handleLinkClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false); // Close menu when a link is clicked
  };

  // Click outside to close mobile menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target) // Also check if click was not on the hamburger itself
        ) {
        setIsMobileMenuOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef, hamburgerRef]);


  return (
    <div className='navbar'>
      {/* Logo/Name */}
      <a
        href='#'
        onClick={(e) => {
          e.preventDefault();
          handleLinkClick("home");
        }}
        className={`navbar-logo-link ${activeSection === "home" ? "active" : ""}`}
      >
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="logo-image" />
        ) : (
          <span>Loading Logo...</span>
        )}
      </a>

      {/* --- Desktop Menu Items (Hidden on Mobile) --- */}
      <ul className="navbar-menu desktop-menu">
        <a
            href='#'
            onClick={(e) => { e.preventDefault(); handleLinkClick(activeSection === "menu" ? "home" : "menu"); }}
            className={`menu-item-desktop ${activeSection === "menu" ? "active" : ""}`}
        >
            Бүтээгдэхүүн
        </a>
        <a
            href='#'
            onClick={(e) => { e.preventDefault(); handleLinkClick("contact-us"); }}
            className={`menu-item-desktop ${activeSection === "contact-us" ? "active" : ""}`}
        >
            Холбоо барих
        </a>
      </ul>

      {/* --- Search Bar and Mobile Menu Trigger Container --- */}
      <div className="navbar-middle">
         {/* Search Bar (Always visible for now, but styled differently on mobile) */}
         <div className="search-container"> {/* Changed li to div for semantics */}
            <input
              type="text"
              className='search'
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {/* Consider conditionally rendering search results based on focus/interaction */}
            {searchTerm && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map(item => (
                  <FoodItem
                    key={item.id} // Use item.id if unique, otherwise item._id
                    id={item.id || item._id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                ))}
              </div>
            )}
         </div>

         {/* Hamburger Menu Button (Visible only on Mobile) */}
         <button
            ref={hamburgerRef}
            className="hamburger-icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu" // Accessibility
            aria-expanded={isMobileMenuOpen} // Accessibility
         >
            ☰ {/* You can replace this with an icon component/SVG */}
         </button>

         {/* --- Mobile Dropdown Menu (Conditionally Rendered) --- */}
         {isMobileMenuOpen && (
            <div ref={mobileMenuRef} className="mobile-menu">
                 <a
                    href='#'
                    onClick={(e) => { e.preventDefault(); handleLinkClick(activeSection === "menu" ? "home" : "menu"); }}
                    className={activeSection === "menu" ? "active" : ""}
                >
                    Бүтээгдэхүүн
                </a>
                <a
                    href='#'
                    onClick={(e) => { e.preventDefault(); handleLinkClick("contact-us"); }}
                    className={activeSection === "contact-us" ? "active" : ""}
                >
                    Холбоо барих
                </a>
                {/* Optionally move cart/login here on mobile if needed */}
            </div>
         )}
      </div>


      {/* --- Right Section (Cart, Login/Profile) --- */}
      <div className="navbar-right">
        <div className="navbar-search-icon"> {/* Kept this div wrapper for the dot */}
          <Link to='/cart' onClick={() => setIsMobileMenuOpen(false)}>
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => {setShowLogin(true); setIsMobileMenuOpen(false);}}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => {navigate('/myorders'); setIsMobileMenuOpen(false);}}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}> {/* Logout already closes menu */}
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