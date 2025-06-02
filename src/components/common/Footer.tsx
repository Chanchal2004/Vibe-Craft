import React from "react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-center"
          >
            <p className="text-gray-600 mb-2">
              Create, share, and have fun with Vibe & Meme Magic!
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 relative"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
              className="text-center"
            >
              <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600">
                Chanchal Chaudhary
              </div>
              <div className="text-sm text-gray-500">
                B.Tech Student at IGDTUW Delhi
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Vibe & Meme Magic. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};