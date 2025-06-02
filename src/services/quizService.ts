import { QuizQuestion, QuizResult } from '../types/quiz';

// Sample questions for the Vibe Check Quiz
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What would you do if you found a bug in production?',
    options: [
      'Panic and blame others',
      'Stay calm and debug methodically',
      'Pretend it doesn\'t exist',
      'Call a team meeting immediately'
    ],
    vibeScores: [2, 8, 1, 5]
  },
  {
    id: 'q2',
    question: 'Your preferred coding environment is:',
    options: [
      'Dark theme, lofi beats playing',
      'Light theme, complete silence',
      'Outside in nature with a laptop',
      'Busy coffee shop with background noise'
    ],
    vibeScores: [7, 4, 9, 6]
  },
  {
    id: 'q3',
    question: 'When faced with a new programming challenge, you:',
    options: [
      'Break it down into smaller tasks',
      'Google the entire solution',
      'Ask ChatGPT for help',
      'Try random approaches until something works'
    ],
    vibeScores: [9, 5, 6, 3]
  },
  {
    id: 'q4',
    question: 'Your reaction to tight deadlines:',
    options: [
      'Thrive under pressure',
      'Make a detailed plan',
      'Request more time immediately',
      'Work overtime to finish'
    ],
    vibeScores: [8, 7, 4, 6]
  },
  {
    id: 'q5',
    question: 'Your favorite debugging technique:',
    options: [
      'Console.log everywhere',
      'Step-by-step debugger',
      'Ask a colleague for help',
      'Take a break and come back fresh'
    ],
    vibeScores: [5, 8, 6, 7]
  },
  {
    id: 'q6',
    question: 'How do you celebrate completing a project?',
    options: [
      'Share it on social media',
      'Treat yourself to something nice',
      'Start the next project immediately',
      'Take a long relaxing break'
    ],
    vibeScores: [7, 8, 4, 6]
  },
  {
    id: 'q7',
    question: 'Your coding style is best described as:',
    options: [
      'Clean and minimalist',
      'Heavily commented',
      'Quick and efficient',
      'Creative and experimental'
    ],
    vibeScores: [8, 6, 7, 5]
  },
  {
    id: 'q8',
    question: 'When learning a new technology, you prefer:',
    options: [
      'Official documentation',
      'Video tutorials',
      'Trial and error',
      'Building a small project'
    ],
    vibeScores: [6, 7, 5, 9]
  },
  {
    id: 'q9',
    question: 'Your ideal team role is:',
    options: [
      'Team leader',
      'Technical expert',
      'Creative problem solver',
      'Supportive team player'
    ],
    vibeScores: [8, 7, 6, 9]
  },
  {
    id: 'q10',
    question: 'Your response to code reviews is:',
    options: [
      'Grateful for feedback',
      'Defensive of your choices',
      'Open to discussion',
      'Eager to improve'
    ],
    vibeScores: [9, 4, 7, 8]
  }
];

// Possible results for the Vibe Check Quiz
const QUIZ_RESULTS: QuizResult[] = [
  {
    id: 'zen-coder',
    title: 'The Zen Coder',
    description: 'You approach coding with calm focus and mindful precision. Your balanced energy creates reliable, maintainable code.',
    gifUrl: 'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
    minScore: 0,
    maxScore: 25
  },
  {
    id: 'creative-spark',
    title: 'The Creative Spark',
    description: 'Your innovative approach and enthusiasm bring fresh ideas to every project. You think outside the box and inspire others!',
    gifUrl: 'https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif',
    minScore: 26,
    maxScore: 45
  },
  {
    id: 'tech-wizard',
    title: 'The Tech Wizard',
    description: 'You have a magical ability to solve complex problems with elegant solutions. Your technical expertise is truly impressive!',
    gifUrl: 'https://media.giphy.com/media/CTX0ivSQbI78A/giphy.gif',
    minScore: 46,
    maxScore: 65
  },
  {
    id: 'coding-ninja',
    title: 'The Coding Ninja',
    description: 'Swift, efficient, and deadly effective. You move silently through codebases, leaving perfectly optimized solutions in your wake.',
    gifUrl: 'https://media.giphy.com/media/RbDKaczqWovIugyJmW/giphy.gif',
    minScore: 66,
    maxScore: 90
  }
];

// Get random quiz questions
export const getRandomQuizQuestions = (count: number = 5): QuizQuestion[] => {
  const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Calculate quiz result based on answers
export const calculateQuizResult = (answers: number[]): QuizResult => {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  
  return QUIZ_RESULTS.find(
    result => totalScore >= result.minScore && totalScore <= result.maxScore
  ) || QUIZ_RESULTS[0];
};