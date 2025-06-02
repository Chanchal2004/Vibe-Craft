import React from "react";
import { Link } from "react-router-dom";
import { Image, Laugh, Activity } from "lucide-react";
import { motion } from "framer-motion";

export const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center my-12"
      >
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-transparent bg-clip-text"
        >
          Vibe & Meme Magic
        </motion.h1>
        
        <motion.p 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Create hilarious memes and discover your current vibe with our fun quiz!
        </motion.p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.4 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
            <Image size={80} className="text-white" />
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3 text-purple-700">Meme Generator</h2>
            <p className="text-gray-600 mb-6">
              Create hilarious memes with multiple captions, custom colors, and upload your own images! Share them with friends or save them to your collection.
            </p>
            
            <Link to="/meme-generator">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Create Memes
              </motion.button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="h-48 bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center">
            <Activity size={80} className="text-white" />
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3 text-pink-600">Vibe Check Quiz</h2>
            <p className="text-gray-600 mb-6">
              Take our fun quiz to discover your current vibe! Answer a few questions and get a personalized result that you can share with friends.
            </p>
            
            <Link to="/vibe-check">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors"
              >
                Take Quiz
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.6 }}
        className="bg-white rounded-xl shadow-xl p-8 text-center"
      >
        <Laugh size={48} className="text-indigo-600 mx-auto mb-4" />
        
        <h2 className="text-2xl font-bold mb-3 text-indigo-700">Saved Favorites</h2>
        <p className="text-gray-600 mb-6">
          View your saved memes and quiz results. Download or share them anytime!
        </p>
        
        <Link to="/favorites">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            View Favorites
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};