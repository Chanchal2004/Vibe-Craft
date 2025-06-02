import React from "react";
import { QuizResult } from "../../types/quiz";
import { Download, Share, Repeat, Send } from "lucide-react";
import { motion } from "framer-motion";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

interface ResultCardProps {
  result: QuizResult;
  onRetakeQuiz: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ 
  result, 
  onRetakeQuiz 
}) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isSharing, setIsSharing] = React.useState(false);
  const shareUrl = window.location.href;
  const shareTitle = `Check out my vibe: ${result.title}! Created with Vibe & Meme Magic by Chanchal Chaudhary (B.Tech Student at IGDTUW Delhi)`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const element = document.getElementById('result-card');
      if (!element) return;

      const canvas = await import('html2canvas').then(module => module.default(element, {
        useCORS: true,
        scale: 2,
        backgroundColor: null
      }));

      // Add signature
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = '14px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText('Created by Chanchal Chaudhary - B.Tech Student at IGDTUW Delhi', canvas.width / 2, canvas.height - 20);
      }

      const link = document.createElement('a');
      link.download = 'my-vibe-result.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download result:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="max-w-xl mx-auto"
    >
      <div id="result-card" className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-xl shadow-2xl p-6 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10 z-0"></div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-center mb-4">Your Vibe Check Result</h3>
          
          <div className="flex justify-center mb-6">
            <img 
              src={result.gifUrl} 
              alt={result.title} 
              className="rounded-lg max-h-56 object-cover"
            />
          </div>
          
          <h2 className="text-4xl font-bold text-center mb-4 text-purple-200">
            {result.title}
          </h2>
          
          <p className="text-lg text-center mb-6">
            {result.description}
          </p>
          
          <div className="text-center text-sm opacity-70 mt-6">
            Created by Chanchal Chaudhary
            <br />
            B.Tech Student at IGDTUW Delhi
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Download size={16} className="mr-2" />
          {isDownloading ? 'Downloading...' : 'Download'}
        </motion.button>
        
        <WhatsappShareButton
          url={shareUrl}
          title={shareTitle}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Send size={16} className="mr-2" />
          Share on WhatsApp
        </WhatsappShareButton>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onRetakeQuiz}
          className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <Repeat size={16} className="mr-2" />
          Retake Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};