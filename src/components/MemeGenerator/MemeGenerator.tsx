import React, { useState, useCallback } from "react";
import { CaptionInput } from "./CaptionInput";
import { MemeCanvas } from "./MemeCanvas";
import { Meme, Caption } from "../../types/meme";
import { getRandomMemeTemplate, getRandomCaptionSuggestion, createMemeFromUpload } from "../../services/memeService";
import { downloadMemeAsImage, shareMeme } from "../../services/downloadService";
import { saveMemeToFavorites } from "../../services/storageService";
import { Download, Share, Bookmark, RefreshCw, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

export const MemeGenerator: React.FC = () => {
  const [meme, setMeme] = useState<Meme>(getRandomMemeTemplate());
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle image upload
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const newMeme = createMemeFromUpload(
          img.src,
          img.width,
          img.height
        );
        setMeme(newMeme);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  // Handle caption text change
  const handleCaptionChange = (position: 'top' | 'middle' | 'bottom', text: string) => {
    const updatedCaptions = meme.captions.map(caption => 
      caption.position === position ? { ...caption, text } : caption
    );
    setMeme({ ...meme, captions: updatedCaptions });
  };

  // Handle caption color change
  const handleCaptionColorChange = (position: 'top' | 'middle' | 'bottom', color: string) => {
    const updatedCaptions = meme.captions.map(caption => 
      caption.position === position ? { ...caption, color } : caption
    );
    setMeme({ ...meme, captions: updatedCaptions });
  };

  // Handle caption outline color change
  const handleCaptionOutlineColorChange = (position: 'top' | 'middle' | 'bottom', outlineColor: string) => {
    const updatedCaptions = meme.captions.map(caption => 
      caption.position === position ? { ...caption, outlineColor } : caption
    );
    setMeme({ ...meme, captions: updatedCaptions });
  };

  // Handle caption position change
  const handleCaptionPositionChange = (position: 'top' | 'middle' | 'bottom', x: number, y: number) => {
    const updatedCaptions = meme.captions.map(caption => 
      caption.position === position ? { ...caption, x, y } : caption
    );
    setMeme({ ...meme, captions: updatedCaptions });
  };

  // Get a random caption suggestion
  const getRandomSuggestion = (position: 'top' | 'middle' | 'bottom') => {
    const suggestion = getRandomCaptionSuggestion();
    handleCaptionChange(position, suggestion);
  };

  // Get a new random meme template
  const getNewRandomMeme = () => {
    setMeme(getRandomMemeTemplate());
  };

  // Download the meme
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadMemeAsImage('meme-canvas', 'my-meme.png');
      showSuccess('Meme downloaded successfully!');
    } catch (error) {
      console.error('Failed to download meme:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Share the meme
  const handleShare = async () => {
    setIsSharing(true);
    try {
      await shareMeme('meme-canvas', 'Check out my meme!');
      showSuccess('Meme shared successfully!');
    } catch (error) {
      console.error('Failed to share meme:', error);
    } finally {
      setIsSharing(false);
    }
  };

  // Save the meme to favorites
  const handleSave = () => {
    setIsSaving(true);
    try {
      saveMemeToFavorites(meme);
      showSuccess('Meme saved to favorites!');
    } catch (error) {
      console.error('Failed to save meme:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Show success message
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-xl p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Create Your Meme</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            {meme.captions.map((caption) => (
              <CaptionInput
                key={caption.position}
                label={`${caption.position.charAt(0).toUpperCase() + caption.position.slice(1)} Text`}
                value={caption.text}
                position={caption.position}
                color={caption.color}
                outlineColor={caption.outlineColor}
                onChange={(text) => handleCaptionChange(caption.position, text)}
                onColorChange={(color) => handleCaptionColorChange(caption.position, color)}
                onOutlineColorChange={(color) => handleCaptionOutlineColorChange(caption.position, color)}
                onSuggestionClick={() => getRandomSuggestion(caption.position)}
              />
            ))}
            
            <div className="flex flex-wrap gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={getNewRandomMeme}
                className="flex items-center justify-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
              >
                <RefreshCw size={16} className="mr-2" />
                New Template
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-4 py-2 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200 transition-colors cursor-pointer"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Upload size={16} className="mr-2" />
                {isDragActive ? "Drop image here" : "Upload Image"}
              </motion.div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <MemeCanvas 
              meme={meme} 
              onCaptionPositionChange={handleCaptionPositionChange} 
            />
            
            <div className="flex justify-center mt-6 space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} className="mr-2" />
                {isDownloading ? 'Downloading...' : 'Download'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleShare}
                disabled={isSharing}
                className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Share size={16} className="mr-2" />
                {isSharing ? 'Sharing...' : 'Share'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Bookmark size={16} className="mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg"
        >
          {successMessage}
        </motion.div>
      )}
    </div>
  );
};