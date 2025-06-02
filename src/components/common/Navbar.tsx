import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Smile, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ rotate: 20 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                <Smile size={32} className="text-purple-600 mr-2" />
              </motion.div>
              <span className="text-xl font-bold text-purple-700">Vibe & Meme Magic</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link to="/meme-generator" className="text-gray-700 hover:text-purple-600 transition-colors">
              Meme Generator
            </Link>
            <Link to="/vibe-check" className="text-gray-700 hover:text-purple-600 transition-colors">
              Vibe Check Quiz
            </Link>
            <Link to="/favorites" className="text-gray-700 hover:text-purple-600 transition-colors">
              Favorites
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-100 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/meme-generator" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-100 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Meme Generator
            </Link>
            <Link 
              to="/vibe-check" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-100 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Vibe Check Quiz
            </Link>
            <Link 
              to="/favorites" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-100 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};