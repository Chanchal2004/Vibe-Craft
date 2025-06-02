export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  vibeScores: number[];
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  gifUrl: string;
  minScore: number;
  maxScore: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  answers: number[];
  result: QuizResult | null;
}