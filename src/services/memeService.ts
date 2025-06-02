import { Meme, Caption } from '../types/meme';

// Default templates from popular meme sites
const DEFAULT_TEMPLATES = [
  {
    id: 'drake',
    url: 'https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg',
    width: 1200,
    height: 1200
  },
  {
    id: 'distracted',
    url: 'https://imgflip.com/s/meme/Distracted-Boyfriend.jpg',
    width: 1200,
    height: 800
  },
  {
    id: 'button',
    url: 'https://imgflip.com/s/meme/Two-Buttons.jpg',
    width: 600,
    height: 908
  },
  {
    id: 'change',
    url: 'https://imgflip.com/s/meme/Change-My-Mind.jpg',
    width: 924,
    height: 616
  },
  {
    id: 'doge',
    url: 'https://imgflip.com/s/meme/Doge.jpg',
    width: 620,
    height: 620
  }
];

const CAPTION_SUGGESTIONS = [
  "When you finally fix that bug...",
  "Me pretending to understand the code I wrote last week",
  "My code after adding one more feature",
  "The moment you realize your project is due tomorrow",
  "When someone says 'it should be easy'",
  "5 minutes into debugging like",
  "That feeling when your code works on the first try",
  "Me explaining my project to non-tech friends",
  "Monday morning vs Friday afternoon",
  "When the client changes requirements again",
  "My brain during a coding interview",
  "What I think I coded vs what I actually coded",
  "When your code works but you don't know why",
  "Expectation vs Reality in web development",
  "Trying to meet project deadlines like"
];

// Get a random meme template
export const getRandomMemeTemplate = (): Meme => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_TEMPLATES.length);
  const template = DEFAULT_TEMPLATES[randomIndex];
  
  return {
    ...template,
    captions: [
      createDefaultCaption('top'),
      createDefaultCaption('middle'),
      createDefaultCaption('bottom')
    ]
  };
};

// Create a meme from a user uploaded image
export const createMemeFromUpload = (url: string, width: number, height: number): Meme => {
  return {
    id: `custom-${Date.now()}`,
    url,
    width,
    height,
    captions: [
      createDefaultCaption('top'),
      createDefaultCaption('middle'),
      createDefaultCaption('bottom')
    ]
  };
};

// Get a random caption suggestion
export const getRandomCaptionSuggestion = (): string => {
  const randomIndex = Math.floor(Math.random() * CAPTION_SUGGESTIONS.length);
  return CAPTION_SUGGESTIONS[randomIndex];
};

// Create a default caption
const createDefaultCaption = (position: 'top' | 'middle' | 'bottom'): Caption => {
  const y = position === 'top' ? 50 : position === 'middle' ? 250 : 450;
  
  return {
    text: '',
    x: 300,
    y,
    color: '#FFFFFF',
    outlineColor: '#000000',
    fontSize: 32,
    position
  };
};