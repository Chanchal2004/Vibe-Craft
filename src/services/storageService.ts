import { Meme } from '../types/meme';
import { QuizResult } from '../types/quiz';

// Keys for localStorage
const FAVORITES_KEY = 'vibe_meme_favorites';
const QUIZ_RESULTS_KEY = 'vibe_meme_quiz_results';
const RECENTLY_USED_MEMES_KEY = 'vibe_meme_recently_used';

// Save a meme to favorites
export const saveMemeToFavorites = (meme: Meme): void => {
  try {
    const favorites = getFavoriteMemes();
    favorites.push({
      ...meme,
      id: `fav-${Date.now()}` // Ensure unique ID
    });
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save meme to favorites:', error);
  }
};

// Get all favorite memes
export const getFavoriteMemes = (): Meme[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Failed to get favorite memes:', error);
    return [];
  }
};

// Remove a meme from favorites
export const removeMemeFromFavorites = (id: string): void => {
  try {
    const favorites = getFavoriteMemes();
    const updatedFavorites = favorites.filter(meme => meme.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Failed to remove meme from favorites:', error);
  }
};

// Save a quiz result
export const saveQuizResult = (result: QuizResult): void => {
  try {
    const results = getQuizResults();
    results.push({
      ...result,
      id: `result-${Date.now()}` // Ensure unique ID
    });
    localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results));
  } catch (error) {
    console.error('Failed to save quiz result:', error);
  }
};

// Get all quiz results
export const getQuizResults = (): QuizResult[] => {
  try {
    const results = localStorage.getItem(QUIZ_RESULTS_KEY);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error('Failed to get quiz results:', error);
    return [];
  }
};

// Track recently used meme templates to avoid repetition
export const trackRecentlyUsedMeme = (id: string): void => {
  try {
    const recentlyUsed = getRecentlyUsedMemes();
    // Add to front, remove if already exists
    const updatedRecent = [id, ...recentlyUsed.filter(memeId => memeId !== id)];
    // Keep only the last 10
    const trimmedRecent = updatedRecent.slice(0, 10);
    localStorage.setItem(RECENTLY_USED_MEMES_KEY, JSON.stringify(trimmedRecent));
  } catch (error) {
    console.error('Failed to track recently used meme:', error);
  }
};

// Get recently used meme templates
export const getRecentlyUsedMemes = (): string[] => {
  try {
    const recentlyUsed = localStorage.getItem(RECENTLY_USED_MEMES_KEY);
    return recentlyUsed ? JSON.parse(recentlyUsed) : [];
  } catch (error) {
    console.error('Failed to get recently used memes:', error);
    return [];
  }
};