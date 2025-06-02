import React from "react";
import { QuizQuestion as QuizQuestionType } from "../../types/quiz";
import { motion } from "framer-motion";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (score: number) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  onAnswer 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto"
    >
      <h3 className="text-xl font-bold mb-6 text-center text-purple-700">
        {question.question}
      </h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(question.vibeScores[index])}
            className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};