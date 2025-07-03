import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-900 dark:bg-gray-900 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="text-amber-400" size={24} />
              <span className="font-bold text-xl">Tuk-Tuk</span>
              <span className="text-amber-400 font-bold text-xl">Go</span>
            </div>
            <p className="text-indigo-200 dark:text-gray-300 mb-6">The authentic auto-rickshaw experience for urban explorers.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-200 dark:text-gray-300 hover:text-amber-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-indigo-200 dark:text-gray-300 hover:text-amber-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-indigo-200 dark:text-gray-300 hover:text-amber-400 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-indigo-200 dark:text-gray-300">
              <li><Link to="/" className="hover:text-amber-400 transition">Home</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition">Services</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition">About</Link></li>
              <li><Link to="/testimonials" className="hover:text-amber-400 transition">Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-indigo-200 dark:text-gray-300">
              <li><a href="#" className="hover:text-amber-400 transition">City Tours</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Point-to-Point</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Hourly Packages</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Airport Transfers</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Corporate Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-indigo-200 dark:text-gray-300">
              <li><a href="#" className="hover:text-amber-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Safety</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-indigo-800 dark:border-gray-700 mt-12 pt-8 text-center text-indigo-200 dark:text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Tuk-TukGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
