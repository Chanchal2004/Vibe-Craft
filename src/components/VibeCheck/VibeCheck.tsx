import React, { useState, useEffect } from "react";
import { QuizQuestion } from "./QuizQuestion";
import { ResultCard } from "./ResultCard";
import { QuizState, QuizQuestion as QuizQuestionType } from "../../types/quiz";
import { getRandomQuizQuestions, calculateQuizResult } from "../../services/quizService";
import { saveQuizResult } from "../../services/storageService";
import { motion } from "framer-motion";

export const VibeCheck: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    questions: [],
    answers: [],
    result: null
  });
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Initialize quiz with random questions
  const initializeQuiz = () => {
    const questions = getRandomQuizQuestions(5); // Get 5 random questions
    setQuizState({
      currentQuestionIndex: 0,
      questions,
      answers: [],
      result: null
    });
    setQuizStarted(true);
    setQuizCompleted(false);
  };
  
  // Handle user answer
  const handleAnswer = (score: number) => {
    const newAnswers = [...quizState.answers, score];
    const newIndex = quizState.currentQuestionIndex + 1;
    
    if (newIndex >= quizState.questions.length) {
      // Quiz completed
      const result = calculateQuizResult(newAnswers);
      saveQuizResult(result);
      
      setQuizState({
        ...quizState,
        answers: newAnswers,
        result
      });
      setQuizCompleted(true);
    } else {
      // Move to next question
      setQuizState({
        ...quizState,
        currentQuestionIndex: newIndex,
        answers: newAnswers
      });
    }
  };
  
  // Retake the quiz
  const retakeQuiz = () => {
    initializeQuiz();
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {!quizStarted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-700">Vibe Check Quiz</h2>
          <p className="text-lg mb-8 text-gray-600">
            Answer a few fun questions and discover your current vibe! 
            Share your results with friends or download for later.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={initializeQuiz}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
          >
            Start Quiz
          </motion.button>
        </motion.div>
      )}
      
      {quizStarted && !quizCompleted && quizState.questions.length > 0 && (
        <div className="mt-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
              </span>
              <span className="text-sm font-medium text-purple-600">
                {Math.round((quizState.currentQuestionIndex / quizState.questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${(quizState.currentQuestionIndex / quizState.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <QuizQuestion 
            question={quizState.questions[quizState.currentQuestionIndex]} 
            onAnswer={handleAnswer} 
          />
        </div>
      )}
      
      {quizCompleted && quizState.result && (
        <div className="mt-6">
          <ResultCard 
            result={quizState.result} 
            onRetakeQuiz={retakeQuiz} 
          />
        </div>
      )}
    </div>
  );
};