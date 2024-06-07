import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { GiBoxingGlove } from 'react-icons/gi';
import { FaShoppingCart, FaRegUserCircle, FaSignOutAlt, FaBookDead, FaTimes } from 'react-icons/fa';
import logo from '../assets/img/ragnar-logo.png'

const Header = ({ isCartOpen, setIsCartOpen }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        window.location.href = '/login';
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-teal-700 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    <div className="flex items-center">
                        <Link to="/" className="text-white text-lg font-bold">
                            <img src={logo} alt="Logo" className="h-12 w-20" />
                        </Link>
                        <span className="text-white text-lg font-bold mr-4">LE HEUSSSS SHOP</span>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link
                            to="/"
                            className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/') ? 'bg-gray-700' : ''}`}
                        >
                            <IoMdHome className="mr-2 text-xl" />
                            Accueil
                        </Link>
                        <Link
                            to="/products"
                            className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/products') ? 'bg-gray-700' : ''}`}
                        >
                            <GiBoxingGlove className="mr-2 text-xl" />
                            Produits
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/profile"
                                    className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/profile') ? 'bg-gray-700' : ''}`}
                                >
                                    <FaRegUserCircle className="mr-2 text-xl" />
                                    Profil
                                </Link>
                                <Link
                                    to="/heuss"
                                    className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/heuss') ? 'bg-gray-700' : ''}`}
                                >
                                    <FaBookDead className="mr-2 text-xl" />
                                    HEUSSSS
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                                >
                                    <FaSignOutAlt className="mr-2 text-xl" />
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/login') ? 'bg-gray-700' : ''}`}
                                >
                                    <FaRegUserCircle className="mr-2 text-xl" />
                                    Connexion
                                </Link>
                                <Link
                                    to="/heuss"
                                    className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/heuss') ? 'bg-gray-700' : ''}`}
                                >
                                    <FaBookDead className="mr-2 text-xl" />
                                    HEUSSSS
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
