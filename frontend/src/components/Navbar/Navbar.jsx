import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
// No longer need to import FoodItem here if only used for search results previously
// import FoodItem from '../FoodItem/FoodItem';

const Navbar = ({ setShowLogin, setActiveSection, activeSection }) => {
    const { getTotalCartAmount, token, setToken, food_list, logoUrl } = useContext(StoreContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        setIsMobileMenuOpen(false);
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim()) { // Check for non-empty trimmed term
            const results = food_list.filter(item =>
                item.name.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    // Function to handle clicking a search result item
    const handleResultClick = (itemId) => {
        window.open(`/food/${itemId}`, '_blank', 'noopener,noreferrer'); // Open details in new tab
        // Clear search results after clicking
        setSearchTerm('');
        setSearchResults([]);
    };


    const handleMobileLinkClick = (section) => {
        setActiveSection(section);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className='navbar'>
            {/* Logo */}
            <a
                href='#'
                onClick={(e) => { e.preventDefault(); handleMobileLinkClick("home"); }}
                className={`navbar-logo-link ${activeSection === "home" ? "active" : ""}`}
            >
                {logoUrl ? <img src={logoUrl} alt="Logo" className="logo-image" /> : <span>Loading Logo...</span>}
            </a>

            {/* Mobile Menu Toggle Button */}
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>☰</button>

            {/* Main Menu UL */}
            <ul className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''} has-mobile-controls`}>
                {/* Links */}
                <a href='#' onClick={(e) => { e.preventDefault(); handleMobileLinkClick(activeSection === "menu" ? "home" : "menu"); }} className={`main-nav-link ${activeSection === "menu" ? "active" : ""}`}>Бүтээгдэхүүн</a>
                <a href='#' onClick={(e) => { e.preventDefault(); handleMobileLinkClick("contact-us"); }} className={`main-nav-link ${activeSection === "contact-us" ? "active" : ""}`}>Холбоо барих</a>

                {/* Search Container */}
                <li className="search-container">
                    <input
                        type="text"
                        className='search'
                        placeholder="Бараа хайх..." /* Changed placeholder text */
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {/* --- Modified Search Results --- */}
                    {searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map(item => (
                                // Replace FoodItem with a simple div showing only the name
                                <div
                                    key={item.id || item._id} // Use appropriate unique ID
                                    className="search-result-item" // Add class for styling
                                    onClick={() => handleResultClick(item.id || item._id)} // Use handler
                                >
                                    {item.name} {/* Display only the name */}
                                </div>
                            ))}
                        </div>
                    )}
                     {/* Optional: Show 'No results' message */}
                     {searchTerm.trim() && searchResults.length === 0 && (
                         <div className="search-results no-results">
                             <p>Илэрц олдсонгүй</p>
                         </div>
                     )}
                    {/* --- End of Modified Search Results --- */}
                </li>
            </ul>

            {/* Navbar Right */}
            <div className="navbar-right">
                {/* Basket Icon */}
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {/* Login/Profile */}
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Нэвтрэх</button> /* Changed button text */
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Захиалга</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Гарах</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;