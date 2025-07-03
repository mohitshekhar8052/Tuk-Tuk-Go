import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, Menu, X, User, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/map', label: 'Map' },
    { path: '/contact', label: 'Contact' }
  ];

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-indigo-900 dark:bg-gray-900 text-white sticky top-0 z-40 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Truck className="text-amber-400" size={28} />
            <span className="font-bold text-2xl">Tuk-Tuk</span>
            <span className="text-amber-400 font-bold text-2xl">Go</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-amber-400 transition ${
                  isActive(item.path) ? 'text-amber-400 font-medium' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/booking"
                  className="bg-amber-500 hover:bg-amber-600 text-indigo-900 font-bold py-2 px-4 rounded-lg transition"
                >
                  Book Now
                </Link>
                
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 text-white hover:text-amber-400 transition rounded-lg hover:bg-indigo-800 dark:hover:bg-gray-700"
                  title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                
                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 text-white hover:text-amber-400 transition"
                  >
                    <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                      <User className="text-indigo-900" size={18} />
                    </div>
                    <span className="hidden lg:block">{user.name}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border dark:border-gray-700">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <User className="inline mr-2" size={16} />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <LogOut className="inline mr-2" size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Theme Toggle for Non-authenticated Users */}
                <button
                  onClick={toggleTheme}
                  className="p-2 text-white hover:text-amber-400 transition rounded-lg hover:bg-indigo-800 dark:hover:bg-gray-700"
                  title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                
                <Link
                  to="/login"
                  className="bg-amber-500 hover:bg-amber-600 text-indigo-900 font-bold py-2 px-4 rounded-lg transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-800 dark:bg-gray-800 px-4 py-2 transition-colors duration-300">
            <div className="flex flex-col space-y-3 pb-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`hover:text-amber-400 transition ${
                    isActive(item.path) ? 'text-amber-400 font-medium' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link
                    to="/booking"
                    onClick={closeMenu}
                    className="bg-amber-500 hover:bg-amber-600 text-indigo-900 font-bold py-2 px-4 rounded-lg transition text-left"
                  >
                    Book Now
                  </Link>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="hover:text-amber-400 transition flex items-center"
                  >
                    <User className="mr-2" size={16} />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="hover:text-amber-400 transition text-left flex items-center"
                  >
                    <LogOut className="mr-2" size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="hover:text-amber-400 transition"
                  >
                    Login
                  </Link>
                </>
              )}
              
              {/* Theme Toggle for Mobile */}
              <button
                onClick={() => {
                  toggleTheme();
                  closeMenu();
                }}
                className="flex items-center hover:text-amber-400 transition"
              >
                {theme === 'light' ? <Moon className="mr-2" size={16} /> : <Sun className="mr-2" size={16} />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
