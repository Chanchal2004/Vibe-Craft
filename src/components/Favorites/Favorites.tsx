import React, { useState, useEffect } from "react";
import { getFavoriteMemes, removeMemeFromFavorites } from "../../services/storageService";
import { Meme } from "../../types/meme";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Meme[]>([]);
  
  useEffect(() => {
    loadFavorites();
  }, []);
  
  const loadFavorites = () => {
    const favoriteMemes = getFavoriteMemes();
    setFavorites(favoriteMemes);
  };
  
  const handleRemove = (id: string) => {
    removeMemeFromFavorites(id);
    loadFavorites();
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">My Saved Memes</h2>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-4">You haven't saved any memes yet.</p>
            <p>Create and save some memes to see them here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((meme) => (
              <motion.div
                key={meme.id}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md relative"
              >
                <div className="relative h-48">
                  <img 
                    src={meme.url} 
                    alt="Meme" 
                    className="w-full h-full object-cover"
                  />
                  
                  {meme.captions.map((caption) => (
                    <div
                      key={caption.position}
                      className="absolute"
                      style={{
                        left: caption.x,
                        top: caption.y,
                        transform: 'translate(-50%, -50%)',
                        textShadow: `2px 2px 0 ${caption.outlineColor}, -2px -2px 0 ${caption.outlineColor}, 2px -2px 0 ${caption.outlineColor}, -2px 2px 0 ${caption.outlineColor}`,
                        color: caption.color,
                        fontSize: `${caption.fontSize / 2}px`, // Scale down for thumbnails
                        fontFamily: 'Impact, sans-serif',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        maxWidth: '100%',
                        wordWrap: 'break-word'
                      }}
                    >
                      {caption.text}
                    </div>
                  ))}
                </div>
                
                <div className="p-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600 truncate">
                    {meme.name || "My Meme"}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => handleRemove(meme.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};