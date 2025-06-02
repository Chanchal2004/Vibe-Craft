export interface Caption {
  text: string;
  x: number;
  y: number;
  color: string;
  outlineColor: string;
  fontSize: number;
  position: 'top' | 'middle' | 'bottom';
}

export interface Meme {
  id: string;
  url: string;
  width: number;
  height: number;
  captions: Caption[];
  name?: string;
}

export interface CaptionInputProps {
  label: string;
  value: string;
  position: 'top' | 'middle' | 'bottom';
  color: string;
  outlineColor: string;
  onChange: (text: string) => void;
  onColorChange: (color: string) => void;
  onOutlineColorChange: (color: string) => void;
  onSuggestionClick: () => void;
}

export interface MemeCanvasProps {
  meme: Meme;
  onCaptionPositionChange: (position: 'top' | 'middle' | 'bottom', x: number, y: number) => void;
}